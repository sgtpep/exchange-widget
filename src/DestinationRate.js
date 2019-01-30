import html from './html.js';
import rateText from './rate-text.js';

let text;
export default (props, state) => {
  text = state.ratesHidden
    ? text
    : rateText(
        state.rates,
        state.destinationPocket.currency,
        state.sourcePocket.currency,
      );
  return html`
    <span class="DestinationRate animated" hidden=${state.ratesHidden}
      >${text}</span
    >
  `;
};
