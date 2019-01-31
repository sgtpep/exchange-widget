import DestinationSlide from './DestinationSlide.js';
import Slider from './Slider.js';
import SourceSlide from './SourceSlide.js';
import html from './html.js';
import { setDestinationPocket, setSourcePocket } from './actions.js';

const focusInput = element => {
  const input = element.querySelector('input');
  if (input) {
    const { scrollLeft } = element.parentElement.parentElement;
    input.focus({ preventScroll: true });
    element.parentElement.parentElement.scrollLeft = scrollLeft;
  }
};

export default (prop, state) => html`
  <div class="ExchangeSliders">
    <${Slider}
      index=${state.pockets.indexOf(state.sourcePocket)}
      onMount=${(index, element) => focusInput(element)}
      onSlide=${(index, element) => {
        setSourcePocket(state.pockets[index]);
        focusInput(element);
      }}
    >
      ${state.pockets.map(
        pocket =>
          html`
            <${SourceSlide} pocket=${pocket} />
          `,
      )}
    <//>
    <${Slider}
      index=${state.pockets.indexOf(state.destinationPocket)}
      onSlide=${(index, element) => {
        setDestinationPocket(state.pockets[index]);
        focusInput(element);
      }}
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
