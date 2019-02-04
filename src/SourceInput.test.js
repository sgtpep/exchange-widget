const fetchMock = require('fetch-mock');
const stateMock = require('./state-mock');

require = require('esm')(module);
const SourceInput = require('./SourceInput');
const html = require('./html');

afterEach(() => fetchMock.reset());

let actions, context, output, render;
beforeEach(
  () =>
    ({ actions, context, output, render } = stateMock(
      html`
        <${SourceInput} pocket=${{ currency: 'USD', sum: 100 }} />
      `
    ))
);

test('check if the source input is initially hidden', () =>
  expect(output()).toMatchInlineSnapshot(`
<span class="SourceInput">
  <default
    max={100}
    prefix=""
    tabindex="-1"
  >
  </default>
</span>
`));

test('show the source input', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  render();
  expect(output()).toMatchInlineSnapshot(`
<span class="SourceInput">
  <default
    max={100}
    prefix=""
    tabindex="-1"
  >
  </default>
</span>
`);
});

test('set the source input value', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  actions.setAmount(100);
  render();
  expect(output()).toMatchInlineSnapshot(`
<span class="SourceInput">
  <default
    max={100}
    prefix="-"
    tabindex="-1"
    value={100}
  >
  </default>
</span>
`);
});
