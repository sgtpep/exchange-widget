import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  componentDidMount() {
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
        <div ref=${this.slides}>
          ${!props.children.length || props.children[0]} ${props.children}
          ${!props.children.length || props.children[props.children.length - 1]}
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
}
