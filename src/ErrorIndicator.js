import html from './html.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  componentDidMount() {
    //    this.hidingTimeout = setTimeout(
    //      () => this.base.classList.add(
    //      10,
    //    );
  }

  //  componentWillReceiveProps(props) {
  //    props.visible || this.updateProgress(1);
  //  }

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
