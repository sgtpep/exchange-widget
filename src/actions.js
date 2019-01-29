import update from './update.js';

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
    .catch(error => {
      error && console.error(error);
      update(state => ({ ...state, ratesError: true }));
    });
};
