import exchangeRate from './exchange-rate.js';
import formatCurrency from './format-currency.js';

export default (rates, fromCurrency, toCurrency, formatOptions = undefined) =>
  `${formatCurrency(1, fromCurrency, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })} = ${formatCurrency(
    exchangeRate(rates, fromCurrency, toCurrency),
    toCurrency,
    formatOptions,
  )}`;
