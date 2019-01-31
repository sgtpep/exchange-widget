import DestinationInput from './DestinationInput.js';
import DestinationRate from './DestinationRate.js';
import DestinationSlide from './DestinationSlide.js';
import Slider from './Slider.js';
import html from './html.js';
import { setDestinationPocket } from './actions.js';

export default (props, state) =>
  html`
    <div class="DestinationSlider">
      <${Slider}
        index=${state.pockets.indexOf(state.destinationPocket)}
        onChange=${index => setDestinationPocket(state.pockets[index])}
      >
        ${state.pockets.map(
          pocket =>
            html`
              <${DestinationSlide} pocket=${pocket} />
            `,
        )}
      <//>
      <p><${DestinationInput} /></p>
      <p><${DestinationRate} /></p>
    </div>
  `;
