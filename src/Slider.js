import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  activatePage(index) {
    const element = this.pagination.current.children[
      this.normalizeIndex(index)
    ];
    [...this.pagination.current.querySelectorAll('.active')].forEach(
      activeElement =>
        activeElement === element || activeElement.classList.remove('active')
    );
    element && element.classList.add('active');
    this.index === undefined ||
      this.pagination.current.classList.add('initialized');
  }

  componentDidMount() {
    this.listeners = [
      ['mousemove', this.onDragMove],
      ['mouseup', this.onDragStop],
    ].map(([type, listener]) => [type, listener.bind(this)]);
    this.listeners.forEach(args => addEventListener(...args));
    [
      ['mousedown', this.onDragStart],
      ['touchend', this.onDragStop],
      ['touchmove', this.onDragMove],
      ['touchstart', this.onDragStart],
    ].forEach(([type, listener, ...args]) =>
      this.slides.current.addEventListener(type, listener.bind(this), ...args)
    );
    this.selectSlide(this.props.index);
    this.props.onMount &&
      this.props.onMount(
        this.props.index,
        this.slides.current.children[this.props.index + 1]
      );
  }

  componentWillReceiveProps(props) {
    const index = Math.max(
      Math.min(props.index, this.props.children.length - 1),
      0
    );
    index === this.index || this.startAnimation(index);
  }

  componentWillUnmount() {
    this.listeners.forEach(args => removeEventListener(...args));
  }

  constructor() {
    super();
    this.pagination = createRef();
    this.slides = createRef();
  }

  eventClientX(event) {
    return (event.touches ? event.touches[0] : event).clientX;
  }

  nextSlideIndex(offset) {
    const slidesOffset = this.slidesOffset();
    const threshold = 100;
    return slidesOffset - offset < -threshold
      ? this.index + 1
      : slidesOffset - offset > threshold
      ? this.index - 1
      : this.index;
  }

  normalizeIndex(index) {
    return index < 0
      ? this.props.children.length - 1
      : index > this.props.children.length - 1
      ? 0
      : index;
  }

  onAnimationTimeout(index) {
    this.slides.current.classList.remove('animating');
    this.selectSlide(this.normalizeIndex(index));
  }

  onDragMove(event) {
    if (
      (event.type === 'mousemove' && this.dragging) ||
      event.type === 'touchmove'
    ) {
      event.preventDefault();
      this.translateToPointer(event);
      this.clientX = this.eventClientX(event);
    }
  }

  onDragStart(event) {
    event.preventDefault();
    this.slides.current.classList.contains('animating') &&
      (this.index = this.nextSlideIndex(this.prevSlidesOffset));
    this.clientX = this.eventClientX(event);
    this.dragging = true;
    this.prevSlidesOffset = this.slidesOffset();
    this.translateToPointer(event);
    this.stopAnimation();
  }

  onDragStop(event) {
    if (
      (event.type === 'mouseup' && this.dragging) ||
      event.type === 'touchend'
    ) {
      this.dragging = false;
      this.startAnimation(this.nextSlideIndex(this.prevSlidesOffset));
      this.prevSlidesOffset === this.slidesOffset() && event.target.focus();
    }
  }

  render(props) {
    return html`
      <div class="Slider">
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
              `
          )}
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
      this.activatePage(index);
      this.translateToSlide(index);
      this.index === undefined ||
        (this.props.onSlide &&
          this.props.onSlide(index, this.slides.current.children[index + 1]));
      this.index = index;
    }
  }

  slidesOffset() {
    const style = getComputedStyle(this.slides.current);
    return new (window.DOMMatrix ||
      window.CSSMatrix ||
      window.WebKitCSSMatrix ||
      window.MSCSSMatrix)(style.transform || style.webkitTransform).m41;
  }

  startAnimation(index) {
    this.activatePage(index);
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(
      () => this.onAnimationTimeout(index),
      300
    );
    this.slides.current.classList.add('animating');
    this.translateToSlide(index);
  }

  stopAnimation() {
    this.slides.current.classList.remove('animating');
    clearTimeout(this.animationTimeout);
  }

  translateSlides(length) {
    this.slides.current.style.transform = this.slides.current.style.webkitTransform = `translateX(${length})`;
  }

  translateToPointer(event) {
    this.translateSlides(
      `${this.slidesOffset() - (this.clientX - this.eventClientX(event))}px`
    );
  }

  translateToSlide(index) {
    return this.translateSlides(
      `${(-100 / (this.props.children.length + 2)) * (index + 1)}%`
    );
  }
}
