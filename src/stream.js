import Kefir from '../node_modules/kefir/dist/kefir.esm.js';

export default value => {
  let emit;
  const stream = Kefir.stream(emitter => (emit = emitter.emit)).scan(
    (value, patch) => patch(value),
    value
  );
  return {
    onUpdate: callback => stream.observe(callback),
    update: value => emit(value),
  };
};
