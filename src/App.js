import * as actions from './actions.js';
import RateDropdown from './RateDropdown.js';
import { Component, html } from '../node_modules/htm/preact/standalone.mjs';
import { onState } from './update.js';

export default class extends Component {
  componentWillMount() {
    onState(state => {
      console.log('state', state);
      this.setState(state);
    });
    this.fetchRates();
  }

  fetchRates() {
    return actions.fetchRates(this.props.ratesURL);
  }

  getChildContext() {
    return { ...actions };
  }

  render(props, state) {
    return html`
      <div>
        ${state.ratesLoading &&
          html`
            <p>Loading</p>
          `}
        ${state.ratesError &&
          html`
            <p>
              Failed to update rates
              <button onClick=${() => this.fetchRates()}>Retry</button>
            </p>
          `}
      </div>
    `;
  }
}
