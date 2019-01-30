import exchangeRate from './exchange-rate.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default (props, state) =>
  !state.rates.length ||
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
        ${state.pockets.map(sourcePocket =>
          state.pockets.map(
            destinationPocket =>
              destinationPocket.currency === sourcePocket.currency ||
              html`
                <option
                  selected=${destinationPocket === state.destinationPocket &&
                    sourcePocket === state.sourcePocket}
                >
                  ${sourcePocket.currency}${' → '}${destinationPocket.currency}
                </option>
              `,
          ),
        )}
      </select>
    </span>
  `;
