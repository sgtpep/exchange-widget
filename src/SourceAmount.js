import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setAmount } from './actions.js';

export default class extends Component {
  componentDidUpdate(props, _, state) {
    this.inputFocusTimeout = setTimeout(() => this.input.current.focus());
  }

  componentWillUnmount() {
    clearTimeout(this.inputFocusTimeout);
  }

  constructor() {
    super();
    this.input = createRef();
  }

  render(props, _, state) {
    return html`
      <span>
        ${state.amount && '-'}
        <input
          autofocus
          max=${props.max}
          min="1"
          onInput=${event => setAmount(event.target.value)}
          ref=${this.input}
          type="number"
          value=${state.amount}
        />
      </span>
    `;
  }
}
