import ReversedRate from './ReversedRate.js';
import formatCurrency from './format-currency.js';
import { html } from '../node_modules/htm/preact/standalone.mjs';

export default props =>
  html`
    <div>
      <p>${props.pocket.currency}</p>
      <p>
        You have${' '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </p>
      <p><${ReversedRate} /></p>
    </div>
  `;
