import RateDropdown from './RateDropdown.js';
import html from './html.js';

export default (props, context) => html`
  <nav class="Header">
    <div>
      <button onClick=${() => props.destroy()}>Cancel</button>
    </div>
    <div><${RateDropdown} /></div>
    <div>
      <button
        class="animated"
        disabled=${context.exchangeDisabled || context.exchangeLoading}
        onClick=${() => props.exchange()}
      >
        Exchange
      </button>
    </div>
  </nav>
`;
