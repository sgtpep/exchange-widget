import exchangeRate from './exchange-rate.js';
import formatCurrency from './format-currency.js';
import html from './html.js';
import { setDestinationPocket, setSourcePocket } from './actions.js';

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
      <select
        onChange=${event => {
          const [
            sourceCurrency,
            destinationCurrency,
          ] = event.target.value.split(':');
          setSourcePocket(
            state.pockets.find(pocket => pocket.currency === sourceCurrency),
          );
          setDestinationPocket(
            state.pockets.find(
              pocket => pocket.currency === destinationCurrency,
            ),
          );
        }}
      >
        ${state.pockets.map(sourcePocket =>
          state.pockets.map(
            destinationPocket =>
              destinationPocket.currency === sourcePocket.currency ||
              html`
                <option
                  selected=${destinationPocket === state.destinationPocket &&
                    sourcePocket === state.sourcePocket}
                  value=${`${sourcePocket.currency}:${
                    destinationPocket.currency
                  }`}
                >
                  ${sourcePocket.currency}${' → '}${destinationPocket.currency}
                </option>
              `,
          ),
        )}
      </select>
    </span>
  `;
