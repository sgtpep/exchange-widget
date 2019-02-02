import html from './html.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  componentWillReceiveProps(props) {
    if (props.visible) {
      this.base.classList.remove('hidden');
      clearTimeout(this.hidingTimeout);
      this.hidingTimeout = setTimeout(
        () => this.base.classList.add('hidden'),
        3000,
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.hidingTimeout);
  }

  render(props) {
    return html`
      <div class=${`ErrorIndicator animated ${props.visible ? '' : 'hidden'}`}>
        <div>${props.children}</div>
      </div>
    `;
  }
}
