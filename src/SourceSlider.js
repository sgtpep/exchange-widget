import Slider from './Slider.js';
import SourceInput from './SourceInput.js';
import SourceSlide from './SourceSlide.js';
import html from './html.js';
import { setSourcePocket } from './actions.js';

export default (props, state) =>
  html`
    <div class="SourceSlider">
      <${Slider}
        index=${state.pockets.indexOf(state.sourcePocket)}
        onChange=${index => setSourcePocket(state.pockets[index])}
      >
        ${state.pockets.map(
          pocket =>
            html`
              <${SourceSlide} pocket=${pocket} />
            `,
        )}
      <//>
      <p><${SourceInput} /></p>
    </div>
  `;
