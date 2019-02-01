import ExchangeSlide from './ExchangeSlide.js';
import Slider from './Slider.js';
import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setDestinationPocket, setSourcePocket } from './actions.js';

export default class extends Component {
  componentDidMount() {
    this.onDestinationFocus = this.onFocus.bind(this, 'destination');
    this.destination.current.base.addEventListener(
      'focus',
      this.onDestinationFocus,
      true,
    );
    this.onSourceFocus = this.onFocus.bind(this, 'source');
    this.source.current.base.addEventListener(
      'focus',
      this.onSourceFocus,
      true,
    );
  }

  componentWillUnmount() {
    this.destination.current.base.removeEventListener(
      'focus',
      this.onDestinationFocus,
    );
    this.source.current.base.removeEventListener('focus', this.onSourceFocus);
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

  render(props, _, state) {
    return html`
      <div class="ExchangeSliders">
        <${Slider}
          index=${state.pockets.indexOf(state.sourcePocket)}
          onMount=${(index, element) => this.focusSlideInput(element, 'source')}
          onSlide=${(index, element) => {
            setSourcePocket(state.pockets[index]);
            this.focusSlideInput(element, 'source');
          }}
          ref=${this.source}
        >
          ${state.pockets.map(
            pocket =>
              html`
                <${ExchangeSlide} pocket=${pocket} type="source" />
              `,
          )}
        <//>
        <${Slider}
          index=${state.pockets.indexOf(state.destinationPocket)}
          onSlide=${(index, element) => {
            setDestinationPocket(state.pockets[index]);
            this.focusSlideInput(element, 'destination');
          }}
          ref=${this.destination}
        >
          ${state.pockets.map(
            pocket =>
              html`
                <${ExchangeSlide} pocket=${pocket} type="destination" />
              `,
          )}
        <//>
      </div>
    `;
  }
}
