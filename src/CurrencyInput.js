import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setAmount } from './actions.js';

export default class extends Component {
  componentDidUpdate() {
    if (this.inputValue !== this.input.current.value) {
      this.inputValue = this.input.current.value;
      this.inputText.current.textContent = this.input.current.value;
      this.input.current.style.width = `${this.inputText.current.offsetWidth +
        30}px`;
    }
  }

  constructor() {
    super();
    this.input = createRef();
    this.inputText = createRef();
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
      <span class="CurrencyInput">
        ${this.props.prefix}
        <input
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
        <span ref=${this.inputText} />
      </span>
    `;
  }
}
