import CurrencyInput from './CurrencyInput.js';
import animatedHideable from './animated-hideable.js';
import exchangeRate from './exchange-rate.js';
import html from './html.js';
import round from './round.js';

export default animatedHideable(
  (props, state) => state.ratesHidden,
  (props, state) => {
    const rate = exchangeRate(
      state.rates,
      state.sourcePocket.currency,
      props.pocket.currency,
    );
    return {
      rate,
      value: state.amount && round(rate * state.amount, 2),
    };
  },
  (props, state) =>
    html`
      <span
        class=${`DestinationInput animated ${props.hidden ? 'hidden' : ''}`}
      >
        <${CurrencyInput}
          max=${props.rate * state.sourcePocket.sum}
          prefix=${state.amount === null || '+'}
          setAmount=${value => (1 / props.rate) * value}
          tabindex="-1"
          value=${props.value}
        />
      </span>
    `,
);
