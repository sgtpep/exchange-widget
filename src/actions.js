import update from './update.js';

export const exchange = () => {};

export const fetchRates = url => {
  update(state => ({ ...state, ratesLoading: true }));
  fetch(url)
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

export const setAmount = (key, amount) =>
  update(state => ({ ...state, [key]: { ...state[key], amount } }));

export const setPocket = (key, pocket) =>
  update(state => ({ ...state, [key]: { ...state[key], pocket } }));
