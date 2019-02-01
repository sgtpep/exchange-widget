import DestinationInput from './DestinationInput.js';
import DestinationRate from './DestinationRate.js';
import SourceInput from './SourceInput.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default (props, state) =>
  html`
    <div class="ExchangeSlide">
      <div class="ExchangeSlide-currency">${props.pocket.currency}</div>
      <div>
        ${'You have '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </div>
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
