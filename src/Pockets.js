import { html } from '../node_modules/htm/preact/standalone.mjs';
import { setPocket } from './actions.js';

export default (props, state) =>
  html`
    <div>
      ${props.pockets.map((pocket, index) => [
        html`
          <a
            onClick=${() => setPocket(props.type, pocket)}
            style=${pocket === state[props.type].pocket && {
              fontWeight: 'bold',
            }}
            >${index + 1}</a
          >
        `,
        ' ',
      ])}
    </div>
  `;
