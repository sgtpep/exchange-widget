import exchangeRate from './exchange-rate.js';
import formatCurrency from './format-currency.js';
import html from './html.js';
import { setDestinationPocket, setSourcePocket } from './actions.js';

const text = (rates, fromCurrency, toCurrency) =>
  `${formatCurrency(1, fromCurrency, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })} = ${formatCurrency(
    exchangeRate(rates, fromCurrency, toCurrency),
    toCurrency,
    { minimumFractionDigits: 4 },
  )}`;

let prevText;
export default (props, state) => {
  prevText = state.ratesHidden
    ? prevText
    : text(
        state.rates,
        state.sourcePocket.currency,
        state.destinationPocket.currency,
      );
  return html`
    <span class="RateDropdown animated" hidden=${state.ratesHidden}>
      <span>${prevText}</span>
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
                  ${!state.rates.length ||
                    text(
                      state.rates,
                      sourcePocket.currency,
                      destinationPocket.currency,
                    )}
                </option>
              `,
          ),
        )}
      </select>
    </span>
  `;
};
