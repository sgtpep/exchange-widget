const fetchMock = require('fetch-mock');
const stateMock = require('./state-mock');

require = require('esm')(module);
const App = require('./App');
const html = require('./html');

afterEach(() => fetchMock.reset());

let output;
beforeEach(() => {
  ({ output } = stateMock(
    html`
      <${App} ratesURL="rates" />
    `
  ));
  fetchMock.getOnce('rates', require('../mocks/rates'));
});

test('render initial application state', () =>{
  expect(output()).toMatchInlineSnapshot(`
<div class="App animated">
  <default visible={false}></default>
  <default visible={false}>
    Failed to update rates 
    <button onClick={[Function anonymous]}>Retry</button>
  </default>
  <default
    destroy={[Function anonymous]}
    exchange={[Function anonymous]}
  >
  </default>
  <default></default>
</div>
`)
  expect(fetchMock.called()).toBeTruthy();
});
