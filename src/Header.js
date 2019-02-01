import ExchangeButton from './ExchangeButton.js';
import RateDropdown from './RateDropdown.js';
import html from './html.js';

export default props => html`
  <nav class="Header">
    <div><button onClick=${() => props.destroy()}>Cancel</button></div>
    <div><${RateDropdown} /></div>
    <div><${ExchangeButton} onExchange=${() => props.destroy()} /></div>
  </nav>
`;
