import Siema from '../node_modules/siema/src/siema.js';
import html from './html.js';
import { Component, createRef } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  activatePage() {
    [...this.pagination.current.querySelectorAll('.active')].forEach(page =>
      page.classList.remove('active'),
    );
    this.pagination.current.children[this.siema.currentSlide].classList.add(
      'active',
    );
  }

  componentDidMount() {
    this.siema = new Siema({
      duration: 300,
      loop: true,
      onChange: () => {
        this.activatePage();
        this.props.onChange && this.props.onChange(this.siema.currentSlide);
      },
      selector: this.base.firstElementChild,
      startIndex: this.props.index,
    });
    this.activatePage();
  }

  componentWillReceiveProps(props) {
    this.siema.goTo(props.index);
  }

  componentWillUnmount() {
    this.siema.destroy();
  }

  constructor() {
    super();
    this.pagination = createRef();
  }

  shouldComponentUpdate() {
    return false;
  }

  render(props) {
    return html`
      <div class="Slider">
        <div>
          ${props.children}
        </div>
        <p ref=${this.pagination}>
          ${props.children.map((child, index) => [
            html`
              <a onClick=${() => this.siema.goTo(index)}>${index + 1}</a>
            `,
            ' ',
          ])}
        </p>
      </div>
    `;
  }
}
