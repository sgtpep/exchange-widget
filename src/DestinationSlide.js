import DestinationInput from './DestinationInput.js';
import DestinationRate from './DestinationRate.js';
import SlideCurrency from './SlideCurrency.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default (props, state) =>
  html`
    <div class="DestinationSlide">
      <p><${SlideCurrency} currency=${props.pocket.currency} /></p>
      <p>
        ${'You have '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </p>
      <p><${DestinationInput} pocket=${props.pocket} /></p>
      <p><${DestinationRate} pocket=${props.pocket} /></p>
    </div>
  `;
