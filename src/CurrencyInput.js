import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setAmount } from './actions.js';

export default class extends Component {
  componentDidUpdate(props, _, state) {
    props.focused &&
      props.focused(state, this.context) &&
      (this.inputFocusTimeout = setTimeout(() => this.input.current.focus()));
  }

  componentWillUnmount() {
    clearTimeout(this.inputFocusTimeout);
  }

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
                event.target.valueAsNumber,
              ),
        )
      : (event.target.value = this.context.amount);
  }

  render(props) {
    return html`
      <input
        autofocus
        class="CurrencyInput"
        max=${props.max}
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
