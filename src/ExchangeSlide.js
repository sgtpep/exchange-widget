import DestinationInput from './DestinationInput.js';
import DestinationRate from './DestinationRate.js';
import SlideCurrency from './SlideCurrency.js';
import SourceInput from './SourceInput.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default (props, state) =>
  html`
    <div class="ExchangeSlide">
      <p><${SlideCurrency} currency=${props.pocket.currency} /></p>
      <p>
        ${'You have '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </p>
      ${props.type === 'source' &&
        html`
          <${SourceInput} pocket=${props.pocket} />
        `}
      ${props.type === 'destination' &&
        html`
          <div>
            <${DestinationInput} pocket=${props.pocket} />
            <${DestinationRate} pocket=${props.pocket} />
          </div>
        `}
    </div>
  `;
