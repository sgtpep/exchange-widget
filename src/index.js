import App from './App.js';
import { html, render } from '../node_modules/htm/preact/standalone.mjs';

export default (element, options) => {
  const root = render(
    html`
      <${App} ...${options} destroy=${() => render(null, element, root)} />
    `,
    element,
  );
};
