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

export const setAmount = (type, amount) =>
  update(state => ({ ...state, [type]: { ...state[type], amount } }));

export const setPocket = (type, pocket) =>
  update(state => ({ ...state, [type]: { ...state[type], pocket } }));

export const setPockets = pockets =>
  update(state => ({
    ...state,
    destination: {
      ...state.destination,
      pocket:
        state.destination && pockets.includes(state.destination)
          ? state.destination
          : pockets[pockets.length === 1 ? 0 : 1],
    },
    pockets,
    source: {
      ...state.source,
      pocket:
        state.source && pockets.includes(state.source)
          ? state.source
          : pockets[0],
    },
  }));
