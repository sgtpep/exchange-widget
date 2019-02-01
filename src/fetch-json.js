export default (
  url,
  signal = undefined,
  onData = undefined,
  onError = undefined,
) =>
  fetch(url, { signal })
    .then(response => (response.ok ? response.json() : Promise.reject()))
    .then(data => onData && onData(data))
    .catch(error => {
      if (
        error.message !== 'NetworkError when attempting to fetch resource.' &&
        error.name !== 'AbortError' &&
        !(signal && signal.aborted)
      ) {
        error && console.error(error);
        onError && onError(error);
      }
    });
