import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  componentDidMount() {
    this.props.onMount &&
      this.props.onMount(
        this.props.index,
        this.slides.current.children[this.props.index + 1],
      );
    this.selectSlide(this.props.index);
    this.listeners = [
      ['mousedown', this.onDragStart],
      ['mousemove', this.onDragMove],
      ['mouseup', this.onDragStop],
      ['touchend', this.onDragStop],
      ['touchmove', this.onDragMove],
      ['touchstart', this.onDragStart],
    ].map(([type, listener]) => [type, listener.bind(this)]);
    this.listeners.forEach(args =>
      this.slides.current.addEventListener(...args),
    );
  }

  componentWillUnmount() {
    this.listeners.forEach(args =>
      this.slides.current.removeEventListener(...args),
    );
  }

  constructor() {
    super();
    this.slides = createRef();
  }

  goToSlide(index) {
    this.startAnimation();
    this.selectSlide(index);
  }

  onAnimated() {
    this.slides.current.classList.remove('animating');
    const count = this.slides.current.children.length - 2;
    this.index < 0 && this.selectSlide(count - 1);
    this.index > count - 1 && this.selectSlide(0);
  }

  onDragMove(event) {
    if (event.type === 'touchmove' || event.buttons === 1) {
      event.preventDefault();
      const { clientX } = event.touches ? event.touches[0] : event;
      this.slides.current.style.left = `${this.slides.current.offsetLeft -
        (this.clientX - clientX)}px`;
      this.clientX = clientX;
      this.dragging = true;
    }
  }

  onDragStart(event) {
    this.clientX = (event.touches ? event.touches[0] : event).clientX;
    this.offsetLeft = this.slides.current.offsetLeft;
    this.stopAnimation();
  }

  onDragStop(event) {
    if (event.type === 'touchend' || this.dragging) {
      const { offsetLeft } = this.slides.current;
      const threshold = 100;
      offsetLeft - this.offsetLeft < -threshold &&
      this.index <= this.slides.current.children.length - 1
        ? this.goToSlide(this.index + 1)
        : offsetLeft - this.offsetLeft > threshold && this.index >= 0
        ? this.goToSlide(this.index - 1)
        : this.goToSlide(this.index);
      this.dragging = false;
    }
  }

  onSlide(index) {
    this.props.onSlide &&
      this.props.onSlide(index, this.slides.current.children[index + 1]);
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
        <nav>
          ${props.children.map((child, index) => [
            html`
              <a onClick=${() => this.onSlide(index)}>${index + 1}</a>
            `,
            ' ',
          ])}
        </nav>
      </div>
    `;
  }

  selectSlide(index) {
    this.index = index;
    this.slides.current.style.left = `${-(index + 1) * 100}%`;
  }

  startAnimation() {
    this.animationTimeout && clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => this.onAnimated(), 300);
    this.slides.current.classList.add('animating');
  }

  stopAnimation() {
    this.slides.current.classList.remove('animating');
    this.animationTimeout && clearTimeout(this.animationTimeout);
  }
}
