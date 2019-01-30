import App from './App.js';
import html from './html.js';
import { render } from '../node_modules/preact/dist/preact.mjs';

export default (element, options) => {
  const root = render(
    html`
      <${App}
        ...${options}
        destroy=${() =>
          render(
            html`
              <p>Widget destroyed. <a href="">Reload</a></p>
            `,
            element,
            root,
          )}
      />
    `,
    element,
  );
};
