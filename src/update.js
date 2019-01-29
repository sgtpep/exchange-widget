import Kefir from '../node_modules/kefir/dist/kefir.esm.js';
import state from './state.js';

let update;
Kefir.stream(emitter => (update = emitter.emit))
  .scan((state, patch) => patch(state), state)
  .map(state => console.log('state', state))
  .observe();
export default update;
