import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setAmount } from './actions.js';

export default class extends Component {
  componentDidUpdate(props, _, state) {
    state.sourcePocket === this.context.sourcePocket ||
      (this.inputFocusTimeout = setTimeout(() => this.input.current.focus()));
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
      <span class="SourceAmount">
        ${!state.amount || '-'}
        <input
          autofocus
          max=${props.max}
          onInput=${event => {
            const decimalsValid =
              (event.target.valueAsNumber.toString().split('.')[1] || '')
                .length <= 2;
            (event.target.valueAsNumber === state.amount && decimalsValid) ||
              setAmount(
                event.target.validity.valid && decimalsValid
                  ? isNaN(event.target.valueAsNumber)
                    ? null
                    : event.target.valueAsNumber
                  : state.amount,
              );
          }}
          ref=${this.input}
          step="any"
          type="number"
          value=${state.amount}
        />
      </span>
    `;
  }
}
