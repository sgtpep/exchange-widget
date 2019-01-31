import html from './html.js';
import rateText from './rate-text.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  render(props, _, state) {
    const hidden = props.pocket === state.sourcePocket;
    this.text = hidden
      ? this.text
      : rateText(
          state.rates,
          props.pocket.currency,
          state.sourcePocket.currency,
        );
    return html`
      <span class=${`DestinationRate animated ${hidden ? 'hidden' : ''}`}>
        ${this.text}
      </span>
    `;
  }
}
