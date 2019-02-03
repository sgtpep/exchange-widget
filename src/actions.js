import fetchJSON from './fetch-json.js';
import state from './state.js';
import stream from './stream.js';

export const exchange = (amount, rate, fromCurrency, toCurrency) => {
  (typeof process !== 'undefined' && process.env.JEST_WORKER_ID) ||
    // eslint-disable-next-line no-console
    console.log('exchange:', amount, rate, fromCurrency, toCurrency);
  update(state => ({ ...state, exchangeLoading: true }));
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() =>
    update(state => ({ ...state, exchangeLoading: false }))
  );
};

export const fetchRates = (urls, signal = undefined) => {
  update(state => ({ ...state, ratesLoading: true }));
  return (Array.isArray(urls) ? urls : [urls])
    .reduce(
      (promise, url) =>
        promise.then(result => result || fetchRatesJSON(url, signal)),
      Promise.resolve()
    )
    .then(result => result || Promise.reject());
};

const fetchRatesJSON = (url, signal = undefined) =>
  fetchJSON(url, signal).then(
    data => {
      update(state => {
        const ratesHidden = getRatesHidden(
          state.sourcePocket,
          state.destinationPocket,
          Object.keys(data.rates).length
        );
        return {
          ...state,
          exchangeDisabled: getExchangeDisabled(ratesHidden, state.amount),
          rates: Object.entries(data.rates)
            .map(([currency, rate]) => ({ currency, rate }))
            .filter(rate => ['EUR', 'GBP'].includes(rate.currency)),
          ratesError: false,
          ratesHidden,
          ratesLoading: false,
        };
      });
      return data;
    },
    () => {
      update(state => ({
        ...state,
        ratesError: true,
        ratesLoading: false,
      }));
    }
  );

const getExchangeDisabled = (ratesHidden, amount) => ratesHidden || !amount;

const getRatesHidden = (sourcePocket, destinationPocket, ratesLength) =>
  !sourcePocket ||
  !destinationPocket ||
  sourcePocket === destinationPocket ||
  !ratesLength;

export const setAmount = amount =>
  update(state => ({
    ...state,
    amount,
    exchangeDisabled: getExchangeDisabled(
      getRatesHidden(
        state.sourcePocket,
        state.destinationPocket,
        state.rates.length
      ),
      amount
    ),
  }));

export const setDestinationPocket = pocket =>
  update(state => {
    const ratesHidden = getRatesHidden(
      state.sourcePocket,
      pocket,
      state.rates.length
    );
    return {
      ...state,
      destinationPocket: pocket,
      exchangeDisabled: getExchangeDisabled(ratesHidden, state.amount),
      ratesHidden,
    };
  });

export const setPockets = pockets => update(state => ({ ...state, pockets }));

export const setSourcePocket = pocket =>
  update(state => {
    const amount = state.amount > pocket.sum ? pocket.sum : state.amount;
    const ratesHidden = getRatesHidden(
      pocket,
      state.destinationPocket,
      state.rates.length
    );
    return {
      ...state,
      amount,
      exchangeDisabled: getExchangeDisabled(ratesHidden, amount),
      ratesHidden,
      sourcePocket: pocket,
    };
  });

const { onUpdate, update } = stream(state);
export default onUpdate;
