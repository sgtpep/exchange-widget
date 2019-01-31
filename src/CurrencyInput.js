import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setAmount } from './actions.js';

export default class extends Component {
  constructor() {
    super();
    this.input = createRef();
  }

  onInput(event) {
    const [integer, fractional = ''] = event.target.value.split(/[.,]/);
    event.target.validity.valid &&
    !/^0./.test(integer) &&
    fractional.length <= 2
      ? event.target.valueAsNumber === this.context.amount ||
        setAmount(
          isNaN(event.target.valueAsNumber)
            ? null
            : (this.props.setAmount || (value => value))(
                Math.min(event.target.valueAsNumber, this.props.max),
              ),
        )
      : (event.target.value = this.props.value);
  }

  render(props) {
    return html`
      <input
        class="CurrencyInput"
        min="0"
        onInput=${event => this.onInput(event)}
        ref=${this.input}
        step="any"
        type="number"
        value=${this.input.current &&
        this.input.current.valueAsNumber === props.value
          ? this.input.current.value
          : props.value}
      />
    `;
  }
}
