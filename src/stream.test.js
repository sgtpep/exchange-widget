require = require('esm')(module);
const stream = require('./stream').default;
const { onUpdate } = require('./stream');

test('update state', () => {
  const update = stream({ foo: 1 });
  const callback = jest.fn();
  onUpdate(callback);
  update(state => ({ ...state, foo: 2 }));
  update(state => ({ ...state, bar: 3 }));
  expect(callback).toHaveBeenNthCalledWith(1, { foo: 1 });
  expect(callback).toHaveBeenNthCalledWith(2, { foo: 2 });
  expect(callback).toHaveBeenNthCalledWith(3, { foo: 2, bar: 3 });
});
