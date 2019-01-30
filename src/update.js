import Kefir from '../node_modules/kefir/dist/kefir.esm.js';
import state from './state.js';

let emit;
const stream = Kefir.stream(emitter => (emit = emitter.emit)).scan(
  (state, patch) => patch(state),
  state,
);

export const onState = callback => stream.observe(callback);
export default state => emit(state);
