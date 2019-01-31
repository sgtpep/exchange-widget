import CurrencyInput from './CurrencyInput.js';
import Slider from './Slider.js';
import SourceSlide from './SourceSlide.js';
import html from './html.js';
import round from './round.js';
import { setSourcePocket } from './actions.js';

export default (props, state) =>
  html`
    <div class="SourceSlider">
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
      <p>
        ${state.amount === null || '- '}
        <${CurrencyInput}
          focused=${(state, prevState) =>
            state.sourcePocket !== prevState.sourcePocket}
          max=${state.sourcePocket.sum}
          value=${state.amount && round(state.amount)}
        />
      </p>
    </div>
  `;
