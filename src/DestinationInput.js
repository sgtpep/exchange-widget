import CurrencyInput from './CurrencyInput.js';
import exchangeRate from './exchange-rate.js';
import html from './html.js';
import round from './round.js';

export default (props, state) => {
  const rate = exchangeRate(
    state.rates,
    state.sourcePocket.currency,
    state.destinationPocket.currency,
  );
  return html`
    <span
      class=${`DestinationInput animated ${state.ratesHidden ? 'hidden' : ''}`}
    >
      ${state.amount === null || '+ '}
      <${CurrencyInput}
        focused=${(state, prevState) =>
          state.destinationPocket !== prevState.destinationPocket &&
          state.sourcePocket === prevState.sourcePocket}
        max=${rate * state.sourcePocket.sum}
        setAmount=${value => (1 / rate) * value}
        value=${state.amount && round(rate * state.amount)}
      />
    </span>
  `;
};
