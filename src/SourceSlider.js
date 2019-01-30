import Slider from './Slider.js';
import SourceSlide from './SourceSlide.js';
import html from './html.js';
import { setSourcePocket } from './actions.js';

export default (props, state) =>
  html`
    <${Slider}
      index=${state.pockets.indexOf(state.sourcePocket)}
      onSelect=${index => setSourcePocket(state.pockets[index])}
    >
      ${state.pockets.map(
        pocket =>
          html`
            <${SourceSlide} pocket=${pocket} />
          `,
      )}
    <//>
  `;