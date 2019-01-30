import RateDropdown from './RateDropdown.js';
import { Component, html } from '../node_modules/htm/preact/standalone.mjs';
import { fetchRates, setPocket } from './actions.js';
import { onState } from './update.js';

export default class extends Component {
  componentDidMount() {
    this.fetchRates();
    this.fetchRatesInterval = setInterval(() => this.fetchRates(), 10000);
  }

  componentWillMount() {
    onState(state => {
      console.log('state', state);
      this.setState(state);
    });
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
      <div>
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
        <div>
          <button onClick=${props.destroy}>Cancel</button>
          <${RateDropdown} rates=${state.rates} />
          <button disabled>Exchange</button>
        </div>
      </div>
    `;
  }
}
