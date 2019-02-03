require = require('esm')(module);
const formatCurrency = require('./format-currency');

test('format 1.005 USD', () =>
  expect(formatCurrency(1.005, 'USD')).toBe('$1.01'));

describe('currency symbols', () => {
  test('format 1 USD', () => expect(formatCurrency(1, 'USD')).toBe('$1.00'));

  test('format 1 EUR', () => expect(formatCurrency(1, 'EUR')).toBe('€1.00'));

  test('format 1 GBP', () => expect(formatCurrency(1, 'GBP')).toBe('£1.00'));
});

describe('formatting options', () => {
  test('format 1.5 USD to an integer', () =>
    expect(
      formatCurrency(1.5, 'USD', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      })
    ).toBe('$2'));

  test('format 1.0005 USD with three decimals', () =>
    expect(formatCurrency(1.0005, 'USD', { minimumFractionDigits: 3 })).toBe(
      '$1.001'
    ));
});
