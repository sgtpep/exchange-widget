require = require('esm')(module);
const round = require('./round');

test('round 0.5', () => expect(round(0.5)).toBe(1));

test('round 0.005 to two decimals', () => expect(round(0.005, 2)).toBe(0.01));
