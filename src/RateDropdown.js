import RateSelect from './RateSelect.js';
import animatedHideable from './animated-hideable.js';
import html from './html.js';
import rateText from './rate-text.js';

export default animatedHideable(
  (props, state) => state.ratesHidden,
  (props, state) => ({
    text: rateText(
      state.rates,
      state.sourcePocket.currency,
      state.destinationPocket.currency,
      { minimumFractionDigits: 4 },
    ),
  }),
  (props, state) =>
    html`
      <span class=${`RateDropdown animated ${props.hidden ? 'hidden' : ''}`}>
        <span>${props.text}</span>
        <${RateSelect} />
      </span>
    `,
);
