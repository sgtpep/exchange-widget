import exchangeRate from './exchange-rate.js';
import html from './html.js';

let prevText;
export default (props, state) => {
  const hidden = state.ratesHidden || !state.amount;
  prevText = hidden
    ? prevText
    : `+${exchangeRate(
        state.rates,
        state.sourcePocket.currency,
        state.destinationPocket.currency,
      ) * state.amount}`;
  return html`
    <span class="DestinationAmount animated" hidden=${hidden}>${prevText}</span>
  `;
};
