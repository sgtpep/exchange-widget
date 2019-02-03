export default (url, signal = undefined) =>
  fetch(url, { signal })
    .then(response =>
      response.ok
        ? response.json()
        : Promise.reject(new Error(response.statusText))
    )
    .catch(error => {
      error.message !== 'NetworkError when attempting to fetch resource.' &&
        !['AbortError', 'Error'].includes(error.name) &&
        !(signal && signal.aborted) &&
        // eslint-disable-next-line no-console
        console.error(error);
      throw error;
    });
