import RateDropdown from './RateDropdown.js';
import html from './html.js';

export default (props, state) => html`
  <nav class="Header">
    <div>
      <button onClick=${() => props.destroy()}>Cancel</button>
    </div>
    <div><${RateDropdown} /></div>
    <div>
      <button
        class="animated"
        disabled=${state.exchangeDisabled || state.exchangeLoading}
        onClick=${() => props.exchange()}
      >
        Exchange
      </button>
    </div>
  </nav>
`;
