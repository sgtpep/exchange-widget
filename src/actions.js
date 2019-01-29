import update from './update.js';

export const fetchRates = temp => {
  update(state => ({ ...state, rates: [temp] }));
};
