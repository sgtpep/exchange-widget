import Kefir from '../node_modules/kefir/dist/kefir.esm.js';

let stream;

export const onUpdate = callback => stream.observe(callback);

export default initialValue => {
  let emit;
  stream = Kefir.stream(emitter => (emit = emitter.emit)).scan(
    (value, patch) => patch(value),
    initialValue,
  );
  return value => emit(value);
};
