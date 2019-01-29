import update from './update.js';

export const fetchRates = url => {
  update(state => ({ ...state, ratesLoading: true }));
  fetch(url)
    .then(response => response.json())
    .then(response =>
      update(state => ({
        ...state,
        rates: Object.entries(response.rates).map(([key, value]) => ({
          currency: key,
          rate: value,
        })),
        ratesLoading: false,
      })),
    );
};
