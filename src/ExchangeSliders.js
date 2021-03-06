import ExchangeSlide from './ExchangeSlide.js';
import Slider from './Slider.js';
import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setDestinationPocket, setSourcePocket } from './actions.js';

export default class extends Component {
  componentDidMount() {
    this.destination.current.base.addEventListener(
      'focus',
      this.onFocus.bind(this, 'destination'),
      true
    );
    this.source.current.base.addEventListener(
      'focus',
      this.onFocus.bind(this, 'source'),
      true
    );
  }

  constructor() {
    super();
    this.destination = createRef();
    this.source = createRef();
  }

  focusSlideInput(element, type) {
    const input =
      type === this.focusedInputType || !this.focusedInputType
        ? element.querySelector('input')
        : this.focusedInput;
    if (input) {
      const { scrollLeft, scrollTop } = element.parentElement.parentElement;
      input.focus({ preventScroll: true });
      [
        element.parentElement.parentElement.scrollLeft,
        element.parentElement.parentElement.scrollTop,
      ] = [scrollLeft, scrollTop];
    }
  }

  onFocus(type, event) {
    event.target.tagName === 'INPUT' &&
      ([this.focusedInput, this.focusedInputType] = [event.target, type]);
  }

  render(props, state, context) {
    return html`
      <div class="ExchangeSliders">
        <${Slider}
          index=${context.pockets.indexOf(context.sourcePocket)}
          onMount=${(index, element) => this.focusSlideInput(element, 'source')}
          onSlide=${(index, element) => {
            setSourcePocket(context.pockets[index]);
            this.focusSlideInput(element, 'source');
          }}
          ref=${this.source}
        >
          ${context.pockets.map(
            pocket =>
              html`
                <${ExchangeSlide} pocket=${pocket} type="source" />
              `
          )}
        <//>
        <${Slider}
          index=${context.pockets.indexOf(context.destinationPocket)}
          onSlide=${(index, element) => {
            setDestinationPocket(context.pockets[index]);
            this.focusSlideInput(element, 'destination');
          }}
          ref=${this.destination}
        >
          ${context.pockets.map(
            pocket =>
              html`
                <${ExchangeSlide} pocket=${pocket} type="destination" />
              `
          )}
        <//>
      </div>
    `;
  }
}
