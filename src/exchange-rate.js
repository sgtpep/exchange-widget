const rate = (rates, currency) =>
  (rates.find(rate => rate.currency === currency) || {}).rate;

export default (rates, fromCurrency, toCurrency) =>
  fromCurrency === 'USD'
    ? rate(rates, toCurrency)
    : toCurrency === 'USD'
    ? 1 / rate(rates, fromCurrency)
    : rate(rates, toCurrency) * (1 / rate(rates, fromCurrency));
