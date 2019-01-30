const currencyRate = (rates, currency) =>
  (rates.find(rate => rate.currency === currency) || {}).rate;

const exchangeRate = (rates, fromCurrency, toCurrency) =>
  fromCurrency === 'USD'
    ? currencyRate(rates, toCurrency)
    : toCurrency === 'USD'
    ? 1 / currencyRate(rates, fromCurrency)
    : currencyRate(rates, toCurrency) * (1 / currencyRate(rates, fromCurrency));

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
