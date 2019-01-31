import CurrencyInput from './CurrencyInput.js';
import exchangeRate from './exchange-rate.js';
import html from './html.js';
import round from './round.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  render(props, _, state) {
    const hidden = props.pocket === state.sourcePocket;
    const rate = exchangeRate(
      state.rates,
      state.sourcePocket.currency,
      props.pocket.currency,
    );
    this.value = hidden
      ? this.value
      : state.amount && round(rate * state.amount);
    return html`
      <span class=${`DestinationInput animated ${hidden ? 'hidden' : ''}`}>
        ${state.amount === null || '+ '}
        <${CurrencyInput}
          max=${rate * state.sourcePocket.sum}
          setAmount=${value => (1 / rate) * value}
          value=${this.value}
        />
      </span>
    `;
  }
}
