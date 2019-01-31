import animatedHideable from './animated-hideable.js';
import html from './html.js';
import rateText from './rate-text.js';

export default animatedHideable(
  (props, state) => props.pocket === state.sourcePocket,
  (props, state) => ({
    text: rateText(
      state.rates,
      props.pocket.currency,
      state.sourcePocket.currency,
    ),
  }),
  (props, state) =>
    html`
      <span class=${`DestinationRate animated ${props.hidden ? 'hidden' : ''}`}>
        ${props.text}
      </span>
    `,
);
