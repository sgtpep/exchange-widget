import CurrencyInput from './CurrencyInput.js';
import formatCurrency from './format-currency.js';
import html from './html.js';
import round from './round.js';

export default (props, state) =>
  html`
    <div class="SourceSlide">
      <p>${props.pocket.currency}</p>
      <p>
        ${'You have '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </p>
      <p>
        ${state.amount === null || '- '}
        <${CurrencyInput}
          focused=${(state, prevState) =>
            state.sourcePocket !== prevState.sourcePocket}
          max=${props.pocket.sum}
          value=${round(state.amount)}
        />
      </p>
    </div>
  `;
