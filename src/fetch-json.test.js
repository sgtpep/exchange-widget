const AbortController = require('abort-controller');
const fetchMock = require('fetch-mock');

require = require('esm')(module);
const fetchJSON = require('./fetch-json');

afterEach(() => fetchMock.reset());

test('resolve on success', () => {
  const data = { foo: 1, bar: 2 };
  fetchMock.getOnce('data', data);
  return expect(fetchJSON('data')).resolves.toEqual(data);
});

test('reject on an unsuccessful response', () => {
  fetchMock.getOnce('data', 404);
  return expect(fetchJSON('data')).rejects.toEqual(new Error('Not Found'));
});

test('reject on a malformed json and log to the console', async () => {
  const consoleError = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});
  fetchMock.getOnce('data', 'malformed');
  const error = expect.objectContaining({
    message:
      'invalid json response body at /data reason: Unexpected token m in JSON at position 0',
    name: 'FetchError',
  });
  await expect(fetchJSON('data')).rejects.toEqual(error);
  expect(consoleError).toHaveBeenLastCalledWith(error);
});

test('reject on abort', () => {
  fetchMock.getOnce('data', {});
  const controller = new AbortController();
  controller.abort();
  return expect(fetchJSON('data', controller.signal)).rejects.toEqual(
    new Error("URL '/data' aborted.")
  );
});
