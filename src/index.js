import App from './App.js';
import html from './html.js';
import { render } from '../node_modules/preact/dist/preact.mjs';

export default (element, options, onDestroy = undefined) => {
  const root = render(
    html`
      <${App}
        ...${options}
        destroy=${() => {
          render(null, element, root);
          onDestroy && onDestroy();
        }}
      />
    `,
    element,
  );
};
