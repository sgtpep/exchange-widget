import DestinationSlide from './DestinationSlide.js';
import Slider from './Slider.js';
import SourceSlide from './SourceSlide.js';
import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';
import { setDestinationPocket, setSourcePocket } from './actions.js';

export default class extends Component {
  componentDidMount() {
    this.onMouseUp = this.onMouseUp.bind(this);
    this.base.addEventListener('mouseup', this.onMouseUp);
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
    this.base.removeEventListener('mouseup', this.onMouseUp);
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

  focusInput(parent, type) {
    const input =
      type === this.focusedInputType || !this.focusedInputType
        ? parent.querySelector('input')
        : this.focusedInput;
    if (input) {
      const { scrollLeft } = parent.parentElement.parentElement;
      input.focus({ preventScroll: true });
      parent.parentElement.parentElement.scrollLeft = scrollLeft;
    }
  }

  onFocus(type) {
    event.target.tagName === 'INPUT' &&
      ([this.focusedInput, this.focusedInputType] = [event.target, type]);
  }

  onMouseUp() {
    this.focusedInput && this.focusedInput.focus();
  }

  render(props, _, state) {
    return html`
      <div class="ExchangeSliders">
        <${Slider}
          index=${state.pockets.indexOf(state.sourcePocket)}
          onMount=${(index, element) => this.focusInput(element, 'source')}
          onSlide=${(index, element) => {
            setSourcePocket(state.pockets[index]);
            this.focusInput(element, 'source');
          }}
          ref=${this.source}
        >
          ${state.pockets.map(
            pocket =>
              html`
                <${SourceSlide} pocket=${pocket} />
              `,
          )}
        <//>
        <${Slider}
          index=${state.pockets.indexOf(state.destinationPocket)}
          onSlide=${(index, element) => {
            setDestinationPocket(state.pockets[index]);
            this.focusInput(element, 'destination');
          }}
          ref=${this.destination}
        >
          ${state.pockets.map(
            pocket =>
              html`
                <${DestinationSlide} pocket=${pocket} />
              `,
          )}
        <//>
      </div>
    `;
  }
}
