import App from './App.js';
import State from './State.js';
import html from './html.js';
import { render } from '../node_modules/preact/dist/preact.mjs';

export default (options) => {
  const root = render(
    html`
      <${State} ...${options}>
        <${App}
          destroy=${() => {
            render(null, element, root);
            options.onDestroy && options.onDestroy();
          }}
          ratesURL=${options.ratesURL}
        />
      <//>
    `,
    options.element
  );
};
