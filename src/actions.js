import update from './update.js';

export const exchange = (amount, rate, fromCurrency, toCurrency) => {
  console.log('exchange:', amount, rate, fromCurrency, toCurrency);
  update(state => ({ ...state, exchangeLoading: true }));
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() =>
    update(state => ({ ...state, exchangeLoading: false })),
  );
};

export const fetchRates = (url, signal = undefined) => {
  update(state => ({ ...state, ratesLoading: true }));
  fetch(url, { signal })
    .then(response => (response.ok ? response.json() : Promise.reject()))
    .then(data =>
      update(state => ({
        ...state,
        rates: Object.entries(data.rates)
          .map(([key, value]) => ({
            currency: key,
            rate: value,
          }))
          .filter(rate => ['EUR', 'GBP', 'USD'].includes(rate.currency)),
        ratesHidden: ratesHidden(
          state.sourcePocket,
          state.destinationPocket,
          !Object.keys(data.rates).length,
        ),
        ratesLoading: false,
      })),
    )
    .catch(error => {
      if (!signal || !signal.aborted) {
        error && console.error(error);
        update(state => ({ ...state, ratesError: true, ratesLoading: false }));
      }
    });
};

const ratesHidden = (sourcePocket, destinationPocket, ratesEmpty) =>
  sourcePocket === destinationPocket || ratesEmpty;

export const setAmount = amount => update(state => ({ ...state, amount }));

export const setDestinationPocket = pocket =>
  update(state => ({
    ...state,
    destinationPocket: pocket,
    ratesHidden: ratesHidden(state.sourcePocket, pocket, !state.rates.length),
  }));

export const setPockets = pockets =>
  update(state => ({
    ...state,
    destinationPocket:
      state.destination && pockets.includes(state.destination)
        ? state.destination
        : pockets[pockets.length === 1 ? 0 : 1],
    pockets,
    sourcePocket:
      state.source && pockets.includes(state.source)
        ? state.source
        : pockets[0],
  }));

export const setSourcePocket = pocket =>
  update(state => ({
    ...state,
    amount:
      state.amount && state.amount > pocket.sum ? pocket.sum : state.amount,
    ratesHidden: ratesHidden(
      pocket,
      state.destinationPocket,
      !state.rates.length,
    ),
    sourcePocket: pocket,
  }));
