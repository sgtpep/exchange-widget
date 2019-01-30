import DestinationSlide from './DestinationSlide.js';
import Slider from './Slider.js';
import html from './html.js';
import { setDestinationPocket } from './actions.js';

export default (props, state) =>
  html`
    <div class="DestinationSlider">
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
    </div>
  `;
