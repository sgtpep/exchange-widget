import html from './html.js';
import rateText from './rate-text.js';
import { setDestinationPocket, setSourcePocket } from './actions.js';

export default (props, state) => html`
  <select
    onChange=${event => {
      const [sourceCurrency, destinationCurrency] = event.target.value.split(
        ':'
      );
      setSourcePocket(
        state.pockets.find(pocket => pocket.currency === sourceCurrency)
      );
      setDestinationPocket(
        state.pockets.find(pocket => pocket.currency === destinationCurrency)
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
              value=${`${sourcePocket.currency}:${destinationPocket.currency}`}
            >
              ${!state.rates.length ||
                rateText(
                  state.rates,
                  sourcePocket.currency,
                  destinationPocket.currency,
                  { minimumFractionDigits: 4 }
                )}
            </option>
          `
      )
    )}
  </select>
`;
