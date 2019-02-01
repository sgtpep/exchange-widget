import ErrorIndicator from './ErrorIndicator.js';
import ExchangeSliders from './ExchangeSliders.js';
import Header from './Header.js';
import LoadingIndicator from './LoadingIndicator.js';
import exchangeRate from './exchange-rate.js';
import html from './html.js';
import round from './round.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';
import {
  exchange,
  fetchRates,
  setDestinationPocket,
  setPockets,
  setSourcePocket,
} from './actions.js';
import { onState } from './update.js';

export default class extends Component {
  componentDidMount() {
    this.onKeyUp = this.onKeyUp.bind(this);
    addEventListener('keyup', this.onKeyUp);
    this.fetchRates();
    this.fetchRatesInterval = setInterval(() => this.fetchRates(), 10000);
  }

  componentWillMount() {
    onState(state => this.setState(state));
    setPockets(this.props.pockets);
    setDestinationPocket(
      this.props.pockets[this.props.pockets.length === 1 ? 0 : 1],
    );
    setSourcePocket(this.props.pockets[0]);
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
    this.state.ratesHidden ||
      !this.state.amount ||
      exchange(
        round(this.state.amount),
        exchangeRate(
          this.state.rates,
          this.state.sourcePocket.currency,
          this.state.destinationPocket.currency,
        ),
        this.state.sourcePocket.currency,
        this.state.destinationPocket.currency,
      ).then(() => this.destroy());
  }

  fetchRates() {
    this.fetchRatesAbort && this.fetchRatesAbort.abort();
    this.fetchRatesAbort = window.AbortController
      ? new AbortController()
      : { abort: () => {} };
    return fetchRates(this.props.ratesURL, this.fetchRatesAbort.signal);
  }

  getChildContext() {
    return this.state;
  }

  onKeyUp(event) {
    event.key === 'Enter'
      ? this.exchange()
      : event.key === 'Escape'
      ? this.destroy()
      : null;
  }

  render(props, state) {
    return html`
      <div class="App animated">
        <${LoadingIndicator}
          visible=${state.ratesLoading && !state.rates.length}
        />
        <${ErrorIndicator} visible=${state.ratesError}>
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
