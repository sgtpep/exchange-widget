import { html } from '../node_modules/htm/preact/standalone.mjs';

export default props =>
  html`
    <div>
      <p>${props.pocket.currency}</p>
      <p>
        You have${' '}
        ${props.pocket.sum.toLocaleString('en', {
          currency: props.pocket.currency,
          style: 'currency',
        })}
      </p>
    </div>
  `;
