import SourceInput from './SourceInput.js';
import SlideCurrency from './SlideCurrency.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default (props, state) =>
  html`
    <div class="SourceSlide">
      <p><${SlideCurrency} currency=${props.pocket.currency} /></p>
      <p>
        ${'You have '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </p>
      <p><${SourceInput} pocket=${props.pocket} /></p>
    </div>
  `;
