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
      update(state => ({
        ...state,
        rates: Object.entries(data.rates)
          .map(([currency, rate]) => ({ currency, rate }))
          .filter(rate => ['EUR', 'GBP', 'USD'].includes(rate.currency)),
        ratesError: false,
        ratesHidden: ratesHidden(
          state.sourcePocket,
          state.destinationPocket,
          !Object.keys(data.rates).length
        ),
        ratesLoading: false,
      }));
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

const ratesHidden = (sourcePocket, destinationPocket, ratesEmpty) =>
  sourcePocket === destinationPocket || ratesEmpty;

export const setAmount = amount => update(state => ({ ...state, amount }));

export const setDestinationPocket = pocket =>
  update(state => ({
    ...state,
    destinationPocket: pocket,
    ratesHidden: ratesHidden(state.sourcePocket, pocket, !state.rates.length),
  }));

export const setPockets = pockets => update(state => ({ ...state, pockets }));

export const setSourcePocket = pocket =>
  update(state => ({
    ...state,
    amount:
      state.amount && state.amount > pocket.sum ? pocket.sum : state.amount,
    ratesHidden: ratesHidden(
      pocket,
      state.destinationPocket,
      !state.rates.length
    ),
    sourcePocket: pocket,
  }));

const { onUpdate, update } = stream(state);
export default onUpdate;
