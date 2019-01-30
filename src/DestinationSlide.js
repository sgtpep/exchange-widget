import ReversedRate from './ReversedRate.js';
import formatCurrency from './format-currency.js';
import html from './html.js';

export default (props, state) =>
  html`
    <div class="DestinationSlide">
      <p>${props.pocket.currency}</p>
      <p>
        ${'You have '}
        ${formatCurrency(props.pocket.sum, props.pocket.currency)}
      </p>
      <p>${state.amount && '+TODO'}</p>
      <p><${ReversedRate} /></p>
    </div>
  `;
