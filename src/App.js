import DestinationSlider from './DestinationSlider.js';
import ExchangeButton from './ExchangeButton.js';
import RateDropdown from './RateDropdown.js';
import SourceSlider from './SourceSlider.js';
import html from './html.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';
import { fetchRates, setPockets } from './actions.js';
import { onState } from './update.js';

export default class extends Component {
  componentDidMount() {
    this.fetchRates();
    this.fetchRatesInterval = setInterval(() => this.fetchRates(), 10000);
  }

  componentWillMount() {
    onState(state => this.setState(state));
    setPockets(this.props.pockets);
  }

  componentWillUnmount() {
    clearInterval(this.fetchRatesInterval);
    this.fetchRatesAbort.abort();
  }

  fetchRates() {
    this.fetchRatesAbort && this.fetchRatesAbort.abort();
    this.fetchRatesAbort = new AbortController();
    return fetchRates(this.props.ratesURL, this.fetchRatesAbort.signal);
  }

  getChildContext() {
    return this.state;
  }

  render(props, state) {
    return html`
      <div class="App">
        ${state.ratesLoading &&
          !state.rates.length &&
          html`
            <p>Loading</p>
          `}
        ${state.ratesError &&
          html`
            <p>
              Failed to update rates
              <button onClick=${() => this.fetchRates()}>Retry</button>
            </p>
          `}
        <nav>
          <button onClick=${() => props.destroy()}>Cancel</button>
          <${RateDropdown} />
          <${ExchangeButton} onExchange=${() => props.destroy()} />
        </nav>
        <${SourceSlider} />
        <${DestinationSlider} />
      </div>
    `;
  }
}
