import Kefir from '../node_modules/kefir/dist/kefir.esm.js';

export default initialValue => {
  let emit;
  const stream = Kefir.stream(emitter => (emit = emitter.emit)).scan(
    (value, patch) => patch(value),
    initialValue
  );
  return {
    onUpdate: callback => stream.observe(callback),
    update: value => {
      emit || stream.observe();
      return emit(value);
    },
  };
};
