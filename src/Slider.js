import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  activatePage(index) {
    [...this.pagination.current.querySelectorAll('.active')].forEach(element =>
      element.classList.remove('active'),
    );
    const element = this.pagination.current.children[index];
    element && element.classList.add('active');
  }

  componentDidMount() {
    this.globalListeners = [
      ['mousemove', this.onDragMove],
      ['mouseup', this.onDragStop],
    ].map(([type, listener]) => [type, listener.bind(this)]);
    this.globalListeners.forEach(args => addEventListener(...args));
    this.slidesListeners = [
      ['mousedown', this.onDragStart],
      ['touchend', this.onDragStop],
      ['touchmove', this.onDragMove],
      ['touchstart', this.onDragStart],
    ].map(([type, listener]) => [type, listener.bind(this)]);
    this.slidesListeners.forEach(args =>
      this.slides.current.addEventListener(...args),
    );
    this.props.onMount &&
      this.props.onMount(
        this.props.index,
        this.slides.current.children[this.props.index + 1],
      );
  }

  componentWillReceiveProps(props) {
    const index = Math.max(
      Math.min(props.index, this.props.children.length - 1),
      0,
    );
    index === this.index || this.startAnimation(index);
  }

  componentWillUnmount() {
    this.globalListeners.forEach(args => removeEventListener(...args));
    this.slidesListeners.forEach(args =>
      this.slides.current.removeEventListener(...args),
    );
  }

  constructor() {
    super();
    this.pagination = createRef();
    this.slides = createRef();
  }

  onAnimation(index) {
    this.slides.current.classList.remove('animating');
    const count = this.slides.current.children.length - 2;
    index < 0
      ? this.selectSlide(count - 1)
      : index > count - 1
      ? this.selectSlide(0)
      : this.selectSlide(index);
  }

  onDragMove(event) {
    if (
      event.type === 'touchmove' ||
      (event.type === 'mousemove' && this.dragging)
    ) {
      event.preventDefault();
      const { clientX } = event.touches ? event.touches[0] : event;
      this.slides.current.style.left = `${this.slides.current.offsetLeft -
        (this.clientX - clientX)}px`;
      this.clientX = clientX;
    }
  }

  onDragStart(event) {
    this.clientX = (event.touches ? event.touches[0] : event).clientX;
    this.dragging = true;
    this.offsetLeft = this.slides.current.offsetLeft;
    this.stopAnimation();
  }

  onDragStop(event) {
    if (
      event.type === 'touchend' ||
      (event.type === 'mouseup' && this.dragging)
    ) {
      this.dragging = false;
      const { offsetLeft } = this.slides.current;
      const threshold = 100;
      offsetLeft - this.offsetLeft < -threshold
        ? this.startAnimation(this.index + 1)
        : offsetLeft - this.offsetLeft > threshold
        ? this.startAnimation(this.index - 1)
        : this.startAnimation(this.index);
    }
  }

  render(props) {
    return html`
      <div class="Slider">
        <div>
          <div
            ref=${this.slides}
            style=${{ width: `${(props.children.length + 2) * 100}%` }}
          >
            ${[
              ...(props.children.length
                ? [props.children[props.children.length - 1]]
                : []),
              ...props.children,
              ...(props.children.length ? [props.children[0]] : []),
            ].map(
              child =>
                html`
                  <div
                    style=${{ width: `${100 / (props.children.length + 2)}%` }}
                  >
                    ${child}
                  </div>
                `,
            )}
          </div>
        </div>
        <nav ref=${this.pagination}>
          ${props.children.map((child, index) => [
            html`
              <a onClick=${() => this.startAnimation(index)}>${index + 1}</a>
            `,
            ' ',
          ])}
        </nav>
      </div>
    `;
  }

  selectSlide(index) {
    if (index !== this.index) {
      this.slides.current.style.left = `${-(index + 1) * 100}%`;
      this.activatePage(index);
      this.index === undefined ||
        (this.props.onSlide &&
          this.props.onSlide(index, this.slides.current.children[index + 1]));
      this.index = index;
    }
  }

  startAnimation(index) {
    this.animationTimeout && clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => this.onAnimation(index), 300);
    this.slides.current.classList.add('animating');
    this.slides.current.style.left = `${-(index + 1) * 100}%`;
  }

  stopAnimation() {
    this.slides.current.classList.remove('animating');
    this.animationTimeout && clearTimeout(this.animationTimeout);
  }
}
