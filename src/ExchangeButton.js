import exchangeRate from './exchange-rate.js';
import html from './html.js';
import round from './round.js';
import { exchange } from './actions.js';

export default (props, state) => html`
  <button
    class="ExchangeButton animated"
    disabled=${state.destinationPocket === state.sourcePocket ||
      !state.amount ||
      state.exchangeLoading}
    onClick=${() =>
      exchange(
        round(state.amount),
        exchangeRate(
          state.rates,
          state.sourcePocket.currency,
          state.destinationPocket.currency,
        ),
        state.sourcePocket.currency,
        state.destinationPocket.currency,
      ).then(() => props.onExchange())}
  >
    Exchange
  </button>
`;
