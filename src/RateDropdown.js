import exchangeRate from './exchange-rate.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default (props, state) =>
  html`
    <span class="RateDropdown">
      <span>
        ${formatCurrency(1, state.sourcePocket.currency, {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        })}
        ${' = '}
        ${formatCurrency(
          exchangeRate(
            state.rates,
            state.sourcePocket.currency,
            state.destinationPocket.currency,
          ),
          state.destinationPocket.currency,
          {
            minimumFractionDigits: 4,
          },
        )}
      </span>
      <select>
        <option>rate 1</option>
        <option>rate 2</option>
      </select>
    </span>
  `;
