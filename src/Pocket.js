import { html } from '../node_modules/htm/preact/standalone.mjs';

export default (props, state) => {
  if (state[props.type].pocket) {
    const pocket = state.pockets.find(
      pocket => pocket === state[props.type].pocket,
    );
    if (pocket) {
      return html`
        <div>
          <p>${pocket.currency}</p>
          <p>
            You have${' '}
            ${pocket.sum.toLocaleString('en', {
              currency: pocket.currency,
              style: 'currency',
            })}
          </p>
        </div>
      `;
    }
  }
};
