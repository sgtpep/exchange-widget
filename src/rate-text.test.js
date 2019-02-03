require = require('esm')(module);
const rateText = require('./rate-text');

const rates = [{ currency: 'EUR', rate: 0.9 }];

test('generate a rate text', () =>
  expect(rateText(rates, 'USD', 'EUR')).toBe('$1 = €0.90'));

test('generate a rate text with more decimals', () =>
  expect(rateText(rates, 'USD', 'EUR', { minimumFractionDigits: 4 })).toBe(
    '$1 = €0.9000',
  ));
