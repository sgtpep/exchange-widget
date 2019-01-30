import App from './App.js';
import { html, render } from '../node_modules/htm/preact/standalone.mjs';

export default options =>
  render(
    html`
      <${App} ...${options} />
    `,
    document.body,
  );
