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
