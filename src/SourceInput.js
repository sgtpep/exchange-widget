import CurrencyInput from './CurrencyInput.js';
import html from './html.js';
import round from './round.js';

export default (props, state) =>
  html`
    <span class="SourceInput">
      ${state.amount === null || '- '}
      <${CurrencyInput}
        focused=${(state, prevState) =>
          state.sourcePocket !== prevState.sourcePocket}
        max=${state.sourcePocket.sum}
        value=${state.amount && round(state.amount)}
      />
    </span>
  `;
