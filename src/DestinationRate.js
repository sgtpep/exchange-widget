import animatedHideable from './animated-hideable.js';
import html from './html.js';
import rateText from './rate-text.js';

export default animatedHideable(
  (props, context) => context.ratesHidden,
  (props, context) => ({
    text: rateText(
      context.rates,
      props.pocket.currency,
      context.sourcePocket.currency
    ),
  }),
  props =>
    html`
      <span class=${`DestinationRate animated${props.hidden ? ' hidden' : ''}`}>
        ${props.text}
      </span>
    `
);
