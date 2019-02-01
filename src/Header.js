import ExchangeButton from './ExchangeButton.js';
import RateDropdown from './RateDropdown.js';
import html from './html.js';

export default props => html`
  <nav class="Header">
    <button onClick=${() => props.destroy()}>Cancel</button>
    <${RateDropdown} />
    <${ExchangeButton} onExchange=${() => props.destroy()} />
  </nav>
`;
