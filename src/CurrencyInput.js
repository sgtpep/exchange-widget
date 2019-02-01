import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setAmount } from './actions.js';

export default class extends Component {
  componentDidUpdate() {
    this.updateHiddenText();
  }

  constructor() {
    super();
    this.hiddenText = createRef();
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
    (this.prevKey === 'Backspace' || this.prevWhich === 8) &&
      event.target.value &&
      ([event.target.value, event.target.value] = [
        `0${event.target.value}`,
        event.target.value,
      ]);
    this.updateHiddenText();
  }

  onKeyDown(event) {
    [this.prevKey, this.prevWhich] = [event.key, event.which];
  }

  render(props) {
    return html`
      <span class="CurrencyInput">
        <span>${props.prefix}<span ref=${this.hiddenText}></span></span>
        <input
          min="0"
          onInput=${event => this.onInput(event)}
          onKeyDown=${event => this.onKeyDown(event)}
          ref=${this.input}
          step="any"
          tabindex=${props.tabindex}
          type="number"
          value=${this.input.current &&
          this.input.current.valueAsNumber === props.value
            ? this.input.current.value
            : props.value}
        />
      </span>
    `;
  }

  updateHiddenText() {
    this.hiddenText.current.textContent = `${this.input.current.value}${
      (this.prevKey === '.' || this.prevWhich === 229) &&
      !this.hiddenText.current.textContent.includes('.')
        ? '.'
        : ''
    }`;
  }
}
