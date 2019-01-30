import html from './html.js';
import rateText from './rate-text.js';

let prevText;
export default (props, state) => {
  prevText = state.ratesHidden
    ? prevText
    : rateText(
        state.rates,
        state.destinationPocket.currency,
        state.sourcePocket.currency,
      );
  return html`
    <span class="animated" hidden=${state.ratesHidden}>${prevText}</span>
  `;
};
