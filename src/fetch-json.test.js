const AbortController = require('abort-controller');
const fetchMock = require('fetch-mock');

require = require('esm')(module);
const fetchJSON = require('./fetch-json');

afterEach(() => fetchMock.reset());

test('resolves on success', () => {
  const data = { foo: 1, bar: 2 };
  fetchMock.getOnce('path', data);
  return expect(fetchJSON('path')).resolves.toEqual(data);
});

test('rejects on an unsuccessful response', () => {
  fetchMock.getOnce('path', 404);
  return expect(fetchJSON('path')).rejects.toEqual(new Error('Not Found'));
});

test('rejects on a malformed json and logs to the console', () => {
  const consoleError = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});
  fetchMock.getOnce('path', 'malformed');
  return fetchJSON('path').catch(reason => {
    const error = expect.objectContaining({
      message:
        'invalid json response body at /path reason: Unexpected token m in JSON at position 0',
      name: 'FetchError',
    });
    expect(consoleError).toHaveBeenLastCalledWith(error);
    expect(reason).toEqual(error);
  });
});

test('rejects on abort', () => {
  fetchMock.getOnce('path', {});
  const controller = new AbortController();
  controller.abort();
  return expect(fetchJSON('path', controller.signal)).rejects.toEqual(
    new Error("URL '/path' aborted."),
  );
});
