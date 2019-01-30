import SourceAmount from './SourceAmount.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default props =>
  html`
    <div>
      <p>${props.pocket.currency}</p>
      <p>
        You have${' '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </p>
      <p>
        <${SourceAmount} max=${props.pocket.sum} />
      </p>
    </div>
  `;
