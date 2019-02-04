import html from './html.js';
import onState, {
  setDestinationPocket,
  setPockets,
  setSourcePocket,
} from './actions.js';
import { Component } from '../node_modules/preact/dist/preact.mjs';

export default class extends Component {
  componentWillMount() {
    onState(state => this.setState(state));
    setPockets(this.props.pockets);
    setDestinationPocket(
      this.props.pockets[this.props.pockets.length === 1 ? 0 : 1]
    );
    setSourcePocket(this.props.pockets[0]);
  }

  getChildContext() {
    return this.state;
  }

  render(props) {
    return html`
      <div>${props.children}</div>
    `;
  }
}
