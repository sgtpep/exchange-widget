require = require('esm')(module);
const exchangeRate = require('./exchange-rate');

const rates = [{ currency: 'EUR', rate: 0.9 }, { currency: 'GBP', rate: 0.8 }];

test('exchange rate is cached', () => {
  expect(exchangeRate(rates, 'USD', 'EUR')).toBe(0.9);
  expect(exchangeRate(rates, 'USD', 'EUR')).toBe(0.9);
});

describe('exchange rate directions', () => {
  test('exchange rate from USD', () =>
    expect(exchangeRate(rates, 'USD', 'EUR')).toBe(0.9));
  test('exchange rate to USD', () =>
    expect(exchangeRate(rates, 'EUR', 'USD')).toBe(1.1111111111111112));
  test('exchange rate from non-USD to non-USD', () =>
    expect(exchangeRate(rates, 'EUR', 'GBP')).toBe(0.888888888888889));
});
