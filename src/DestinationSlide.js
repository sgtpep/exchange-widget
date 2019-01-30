import DestinationAmount from './DestinationAmount.js';
import ReversedRate from './ReversedRate.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default props =>
  html`
    <div>
      <p>${props.pocket.currency}</p>
      <p>
        ${'You have '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </p>
      <p><${DestinationAmount} /></p>
      <p><${ReversedRate} /></p>
    </div>
  `;
