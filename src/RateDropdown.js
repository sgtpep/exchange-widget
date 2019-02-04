import RateSelect from './RateSelect.js';
import animatedHideable from './animated-hideable.js';
import html from './html.js';
import rateText from './rate-text.js';

export default animatedHideable(
  (props, context) => context.ratesHidden,
  (props, context) => ({
    text: rateText(
      context.rates,
      context.sourcePocket.currency,
      context.destinationPocket.currency,
      { minimumFractionDigits: 4 }
    ),
  }),
  props =>
    html`
      <span class=${`RateDropdown animated${props.hidden ? ' hidden' : ''}`}>
        <span class="button">${props.text}</span>
        <${RateSelect} />
      </span>
    `
);
