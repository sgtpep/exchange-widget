import exchangeRate from './exchange-rate.js';
import html from './html.js';

let text;
export default (props, state) => {
  const hidden = state.ratesHidden || !state.amount;
  text = hidden
    ? text
    : `+${exchangeRate(
        state.rates,
        state.sourcePocket.currency,
        state.destinationPocket.currency,
      ) * state.amount}`;
  return html`
    <span class="DestinationAmount animated" hidden=${hidden}>${text}</span>
  `;
};
