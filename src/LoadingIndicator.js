import html from './html.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  componentDidMount() {
    this.progressInterval = setInterval(
      () => this.updateProgress(this.progress + 0.01 * (1 - this.progress)),
      10
    );
    this.updateProgress(0);
  }

  componentWillReceiveProps(props) {
    props.visible || this.updateProgress(1);
  }

  componentWillUnmount() {
    clearInterval(this.progressInterval);
  }

  render(props) {
    return html`
      <div
        class=${`LoadingIndicator animated${props.visible ? '' : ' hidden'}`}
      />
    `;
  }

  updateProgress(progress) {
    this.progress = progress;
    this.base.style.transform = this.base.style.webkitTransform = `translateX(${progress *
      100 -
      100}%)`;
    this.progress > 0.9999 && clearInterval(this.progressInterval);
  }
}
