import CurrencyInput from './CurrencyInput.js';
import animatedHideable from './animated-hideable.js';
import exchangeRate from './exchange-rate.js';
import html from './html.js';
import round from './round.js';

export default animatedHideable(
  (props, context) => context.ratesHidden,
  (props, context) => {
    const rate = exchangeRate(
      context.rates,
      context.sourcePocket.currency,
      props.pocket.currency
    );
    return {
      rate,
      value: context.amount && round(rate * context.amount, 2),
    };
  },
  (props, context) =>
    html`
      <span
        class=${`DestinationInput animated${props.hidden ? ' hidden' : ''}`}
      >
        <${CurrencyInput}
          max=${props.rate && props.rate * context.sourcePocket.sum}
          prefix=${context.amount === null ? '' : '+'}
          setAmount=${value => (1 / props.rate) * value}
          tabindex="-1"
          value=${props.value}
        />
      </span>
    `
);
