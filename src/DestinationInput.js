import CurrencyInput from './CurrencyInput.js';
import exchangeRate from './exchange-rate.js';
import html from './html.js';

export default (props, state) => html`
  <${CurrencyInput}
    focused=${(state, prevState) =>
      state.destinationPocket !== prevState.destinationPocket &&
      state.sourcePocket === prevState.sourcePocket}
    value=${state.amount &&
      Number(
        (
          exchangeRate(
            state.rates,
            state.sourcePocket.currency,
            state.destinationPocket.currency,
          ) * state.amount
        ).toFixed(2),
      )}
  />
`;
