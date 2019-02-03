require = require('esm')(module);
const stream = require('./stream');

test('update state', () => {
  const { onUpdate, update } = stream({ foo: 1 });
  const callback = jest.fn();
  onUpdate(callback);
  expect(callback).lastCalledWith({ foo: 1 });
  update(state => ({ ...state, foo: 2 }));
  expect(callback).lastCalledWith({ foo: 2 });
  update(state => ({ ...state, bar: 3 }));
  expect(callback).lastCalledWith({ foo: 2, bar: 3 });
});
