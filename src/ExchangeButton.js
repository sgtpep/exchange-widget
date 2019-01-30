import html from './html.js';

export default (props, state) => html`
  <button
    class="ExchangeButton"
    disabled=${state.destinationPocket === state.sourcePocket || !state.amount}
  >
    Exchange
  </button>
`;
