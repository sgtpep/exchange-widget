import exchangeRate from './exchange-rate.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

let text;
export default (props, state) => {
  const hidden = state.ratesHidden || !state.amount;
  text = hidden
    ? text
    : `+${formatCurrency(
        exchangeRate(
          state.rates,
          state.sourcePocket.currency,
          state.destinationPocket.currency,
        ) * state.amount,
        state.destinationPocket.currency,
        { currencyDisplay: 'code' },
      ).replace(/[A-Z]{3}/, '')}`;
  return html`
    <span class="DestinationAmount animated" hidden=${hidden}>${text}</span>
  `;
};
