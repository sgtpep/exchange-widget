const exchangeRate = (rates, fromCurrency, toCurrency) =>
  fromCurrency === 'USD'
    ? rate(rates, toCurrency)
    : toCurrency === 'USD'
    ? 1 / rate(rates, fromCurrency)
    : rate(rates, toCurrency) * (1 / rate(rates, fromCurrency));

const rate = (rates, currency) =>
  (rates.find(rate => rate.currency === currency) || {}).rate;

const cache = new Map();
let prevRates;
export default (rates, fromCurrency, toCurrency) => {
  if (rates !== prevRates) {
    cache.clear();
    prevRates = rates;
  }
  const key = `${fromCurrency}:${toCurrency}`;
  if (cache.has(key)) {
    return cache.get(key);
  } else {
    const result = exchangeRate(rates, fromCurrency, toCurrency);
    cache.set(key, result);
    return result;
  }
};
