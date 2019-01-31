import CurrencyInput from './CurrencyInput.js';
import html from './html.js';
import round from './round.js';

export default (props, state) =>
  html`
    <span class="SourceInput">
      ${state.amount === null || '- '}
      <${CurrencyInput}
        max=${props.pocket.sum}
        value=${state.amount && round(state.amount)}
      />
    </span>
  `;
