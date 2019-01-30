import update from './update.js';

export const exchange = () => {};

export const fetchRates = (url, signal = undefined) => {
  update(state => ({ ...state, ratesLoading: true }));
  fetch(url, { signal })
    .then(response => (response.ok ? response.json() : Promise.reject()))
    .then(data =>
      update(state => ({
        ...state,
        rates: Object.entries(data.rates).map(([key, value]) => ({
          currency: key,
          rate: value,
        })),
        ratesLoading: false,
      })),
    )
    .catch(() =>
      update(state => ({ ...state, ratesError: true, ratesLoading: false })),
    );
};

export const setAmount = amount => update(state => ({ ...state, amount }));

export const setDestinationPocket = pocket =>
  update(state => ({ ...state, destinationPocket: pocket }));

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
    sourcePocket: pocket,
  }));
