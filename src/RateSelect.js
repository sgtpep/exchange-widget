import html from './html.js';
import rateText from './rate-text.js';
import { setDestinationPocket, setSourcePocket } from './actions.js';

export default (props, context) => html`
  <select
    onChange=${event => {
      const [sourceCurrency, destinationCurrency] = event.target.value.split(
        ':'
      );
      setSourcePocket(
        context.pockets.find(pocket => pocket.currency === sourceCurrency)
      );
      setDestinationPocket(
        context.pockets.find(pocket => pocket.currency === destinationCurrency)
      );
    }}
  >
    ${context.pockets.map(sourcePocket =>
      context.pockets.map(
        destinationPocket =>
          destinationPocket.currency === sourcePocket.currency ||
          html`
            <option
              selected=${destinationPocket === context.destinationPocket &&
                sourcePocket === context.sourcePocket}
              value=${`${sourcePocket.currency}:${destinationPocket.currency}`}
            >
              ${!context.rates.length ||
                rateText(
                  context.rates,
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
