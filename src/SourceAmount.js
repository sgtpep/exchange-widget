import html from './html.js';
import { setAmount } from './actions.js';

export default (props, state) => html`
  <span>
    ${state.amount && '-'}
    <input
      max=${props.max}
      min="1"
      onInput=${event => setAmount(event.target.value)}
      type="number"
      value=${state.amount}
    />
  </span>
`;
