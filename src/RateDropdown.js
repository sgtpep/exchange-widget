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

let rate;
export default (props, state) => {
  const hidden = state.destinationPocket === state.sourcePocket;
  rate = hidden
    ? rate
    : text(
        state.rates,
        state.sourcePocket.currency,
        state.destinationPocket.currency,
      );
  return (
    !state.rates.length ||
    html`
      <span class=${`RateDropdown ${hidden ? 'hidden' : ''}`}>
        <span>${rate}</span>
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
                    ${text(
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
    `
  );
};
