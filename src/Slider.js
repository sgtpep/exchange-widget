import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  componentDidMount() {
    this.setupSlider();
    this.props.onMount &&
      this.props.onMount(
        this.props.index,
        this.slides.current.children[this.props.index + 1],
      );
  }

  constructor() {
    super();
    this.slides = createRef();
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

  setupSlider() {
    var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = this.slides.current.children,
      slidesLength = slides.length - 2,
      slideSize = this.slides.current.children[0].offsetWidth,
      index = 0,
      allowShift = true;

    const dragStart = e => {
      e = e || window.event;
      e.preventDefault();
      posInitial = this.slides.current.offsetLeft;

      if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    };

    const dragAction = e => {
      e = e || window.event;

      if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      this.slides.current.style.left =
        this.slides.current.offsetLeft - posX2 + 'px';
    };

    const dragEnd = e => {
      posFinal = this.slides.current.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, 'drag');
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, 'drag');
      } else {
        this.slides.current.style.left = posInitial + 'px';
      }

      document.onmouseup = null;
      document.onmousemove = null;
    };

    const shiftSlide = (dir, action) => {
      this.slides.current.classList.add('shifting');

      if (allowShift) {
        if (!action) {
          posInitial = this.slides.current.offsetLeft;
        }

        const offset = (posInitial / slideSize) * 100;
        if (dir == 1) {
          this.slides.current.style.left = offset - 100 + '%';
          index++;
        } else if (dir == -1) {
          this.slides.current.style.left = offset + 100 + '%';
          index--;
        }
      }

      allowShift = false;
    };

    const checkIndex = () => {
      this.slides.current.classList.remove('shifting');

      if (index == -1) {
        this.slides.current.style.left = -(slidesLength * slideSize) + 'px';
        index = slidesLength - 1;
      }

      if (index == slidesLength) {
        this.slides.current.style.left = -(1 * slideSize) + 'px';
        index = 0;
      }

      allowShift = true;
    };

    this.slides.current.addEventListener('mousedown', dragStart);
    this.slides.current.addEventListener('touchend', dragEnd);
    this.slides.current.addEventListener('touchmove', dragAction);
    this.slides.current.addEventListener('touchstart', dragStart);
    this.slides.current.addEventListener('transitionend', checkIndex);

    this.slides.current.style.left = '-100%';
  }
}
