import DestinationSlide from './DestinationSlide.js';
import ExchangeButton from './ExchangeButton.js';
import RateDropdown from './RateDropdown.js';
import Slider from './Slider.js';
import SourceSlide from './SourceSlide.js';
import html from './html.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';
import {
  fetchRates,
  setDestinationPocket,
  setPockets,
  setSourcePocket,
} from './actions.js';
import { onState } from './update.js';

export default class extends Component {
  componentDidMount() {
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
    clearInterval(this.fetchRatesInterval);
    this.fetchRatesAbort.abort();
  }

  fetchRates() {
    this.fetchRatesAbort && this.fetchRatesAbort.abort();
    this.fetchRatesAbort = new AbortController();
    return fetchRates(this.props.ratesURL, this.fetchRatesAbort.signal);
  }

  focusInput(element) {
    const input = element.querySelector('input');
    input && input.focus();
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
        <${Slider}
          index=${state.pockets.indexOf(state.sourcePocket)}
          onMount=${(index, element) => this.focusInput(element)}
          onSlide=${(index, element) => {
            setSourcePocket(state.pockets[index]);
            this.focusInput(element);
          }}
          ref=${this.sourceSlider}
        >
          ${state.pockets.map(
            pocket =>
              html`
                <${SourceSlide} pocket=${pocket} />
              `,
          )}
        <//>
        <${Slider}
          index=${state.pockets.indexOf(state.destinationPocket)}
          onSlide=${(index, element) => {
            setDestinationPocket(state.pockets[index]);
            this.focusInput(element);
          }}
        >
          ${state.pockets.map(
            pocket =>
              html`
                <${DestinationSlide} pocket=${pocket} />
              `,
          )}
        <//>
      </div>
    `;
  }
}
