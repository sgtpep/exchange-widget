import CurrencyInput from './CurrencyInput.js';
import html from './html.js';
import round from './round.js';

export default (props, state) =>
  html`
    <span class="SourceInput">
      ${state.amount === null || '- '}
      <${CurrencyInput}
        focused=${(state, prevState) =>
          prevState.sourcePocket === props.pocket &&
          prevState.sourcePocket !== state.sourcePocket}
        max=${props.pocket.sum}
        value=${state.amount && round(state.amount)}
      />
    </span>
  `;
