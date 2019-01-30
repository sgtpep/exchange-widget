export default (number, currency, options = {}) =>
  number.toLocaleString('en', {
    currency,
    style: 'currency',
    ...options,
  });
