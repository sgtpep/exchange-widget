export default (number, currency, options = {}) =>
  number.toLocaleString('en-US', {
    currency,
    style: 'currency',
    ...options,
  });
