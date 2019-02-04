import ErrorIndicator from './ErrorIndicator.js';
import ExchangeSliders from './ExchangeSliders.js';
import Header from './Header.js';
import LoadingIndicator from './LoadingIndicator.js';
import exchangeRate from './exchange-rate.js';
import html from './html.js';
import round from './round.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';
import { exchange, fetchRates } from './actions.js';

export default class extends Component {
  componentDidMount() {
    this.onKeyUp = this.onKeyUp.bind(this);
    addEventListener('keyup', this.onKeyUp);
    this.fetchRates();
    this.fetchRatesInterval = setInterval(() => this.fetchRates(), 10000);
  }

  componentWillUnmount() {
    removeEventListener('keyup', this.onKeyUp);
    clearInterval(this.fetchRatesInterval);
    this.fetchRatesAbort.abort();
  }

  destroy() {
    this.base.classList.add('hidden');
    setTimeout(this.props.destroy, 300);
  }

  exchange() {
    this.context.exchangeDisabled ||
      exchange(
        round(this.context.amount, 2),
        exchangeRate(
          this.context.rates,
          this.context.sourcePocket.currency,
          this.context.destinationPocket.currency
        ),
        this.context.sourcePocket.currency,
        this.context.destinationPocket.currency
      ).then(() => this.destroy());
  }

  fetchRates() {
    this.fetchRatesAbort && this.fetchRatesAbort.abort();
    this.fetchRatesAbort =
      typeof AbortController === 'undefined'
        ? { abort: () => {} }
        : new AbortController();
    return fetchRates(this.props.ratesURL, this.fetchRatesAbort.signal);
  }

  onKeyUp(event) {
    event.key === 'Enter'
      ? this.exchange()
      : event.key === 'Escape'
      ? this.destroy()
      : null;
  }

  render(props, state, context) {
    return html`
      <div class="App animated">
        <${LoadingIndicator}
          visible=${context.ratesLoading && !context.rates.length}
        />
        <${ErrorIndicator} visible=${context.ratesError}>
          ${'Failed to update rates '}
          <button onClick=${() => this.fetchRates()}>Retry</button>
        <//>
        <${Header}
          destroy=${() => this.destroy()}
          exchange=${() => this.exchange()}
        />
        <${ExchangeSliders} />
      </div>
    `;
  }
}
