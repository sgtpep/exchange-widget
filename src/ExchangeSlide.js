import DestinationInput from './DestinationInput.js';
import DestinationRate from './DestinationRate.js';
import SourceInput from './SourceInput.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default props =>
  html`
    <div class="ExchangeSlide">
      <div>
        <div class="ExchangeSlide-currency">${props.pocket.currency}</div>
        ${props.type === 'source'
          ? html`
              <${SourceInput} pocket=${props.pocket} />
            `
          : html`
              <${DestinationInput} pocket=${props.pocket} />
            `}
      </div>
      <div>
        <div>
          ${'You have '}
          ${formatCurrency(props.pocket.sum, props.pocket.currency)}
        </div>
        ${props.type === 'destination' &&
          html`
            <${DestinationRate} pocket=${props.pocket} />
          `}
      </div>
    </div>
  `;
