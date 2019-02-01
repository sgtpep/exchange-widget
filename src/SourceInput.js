import CurrencyInput from './CurrencyInput.js';
import html from './html.js';
import round from './round.js';

export default (props, state) =>
  html`
    <span class="SourceInput">
      <${CurrencyInput}
        max=${props.pocket.sum}
        prefix=${state.amount === null || '-'}
        tabindex="-1"
        value=${state.amount && round(state.amount)}
      />
    </span>
  `;
