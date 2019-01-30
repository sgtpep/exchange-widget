import Slider from './Slider.js';
import DestinationSlide from './DestinationSlide.js';
import { html } from '../node_modules/htm/preact/standalone.mjs';
import { setDestinationPocket } from './actions.js';

export default (props, state) =>
  html`
    <${Slider}
      index=${state.pockets.indexOf(state.destinationPocket)}
      onSelect=${index => setDestinationPocket(state.pockets[index])}
    >
      ${state.pockets.map(
        pocket =>
          html`
            <${DestinationSlide} pocket=${pocket} />
          `,
      )}
    <//>
  `;
