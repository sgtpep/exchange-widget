import html from './html.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';

export default props =>
  html`
    <div class="Slider">
      <div>
        ${!props.children.length || props.children[0]} ${props.children}
        ${!props.children.length || props.children[props.children.length - 1]}
      </div>
      <nav>
        ${props.children.map((child, index) => [
          html`
            <a onClick=${() => props.onSlide(index)}>${index + 1}</a>
          `,
          ' ',
        ])}
      </nav>
    </div>
  `;
