import CurrencyInput from './CurrencyInput.js';
import exchangeRate from './exchange-rate.js';
import html from './html.js';

const round = number => Number(number.toFixed(2));

export default (props, state) => {
  const rate = exchangeRate(
    state.rates,
    state.sourcePocket.currency,
    state.destinationPocket.currency,
  );
  return html`
    <${CurrencyInput}
      focused=${(state, prevState) =>
        state.destinationPocket !== prevState.destinationPocket &&
        state.sourcePocket === prevState.sourcePocket}
      setAmount=${value => round((1 / rate) * value)}
      value=${state.amount && round(rate * state.amount)}
    />
  `;
};
