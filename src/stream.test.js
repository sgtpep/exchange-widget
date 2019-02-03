require = require('esm')(module);
const stream = require('./stream').default;
const { onUpdate } = require('./stream');

test('state updates', () => {
  const update = stream({ foo: 1 });
  const callback = jest.fn();
  onUpdate(callback);
  expect(callback).toHaveBeenLastCalledWith({ foo: 1 });
  update(state => ({ ...state, foo: 2 }));
  expect(callback).toHaveBeenLastCalledWith({ foo: 2 });
  update(state => ({ ...state, bar: 3 }));
  expect(callback).toHaveBeenLastCalledWith({ foo: 2, bar: 3 });
});
