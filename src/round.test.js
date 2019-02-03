require = require('esm')(module);
const round = require('./round');

test('rounds 0.5', () => expect(round(0.5)).toBe(1));

test('rounds 0.005 with two decimals', () =>
  expect(round(0.005, 2)).toBe(0.01));