import CurrencyInput from './CurrencyInput.js';
import html from './html.js';
import round from './round.js';

export default (props, context) =>
  html`
    <span class="SourceInput">
      <${CurrencyInput}
        max=${props.pocket.sum}
        prefix=${context.amount === null ? '' : '-'}
        tabindex="-1"
        value=${context.amount && round(context.amount, 2)}
      />
    </span>
  `;
