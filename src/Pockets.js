import Pocket from './Pocket.js';
import { html } from '../node_modules/htm/preact/standalone.mjs';
import { setPocket } from './actions.js';

export default (props, state) =>
  html`
    <div>
      <${Pocket} type=${props.type} />
      <p>
        ${state.pockets.map((pocket, index) => [
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
      </p>
    </div>
  `;
