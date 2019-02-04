const fetchMock = require('fetch-mock');
const stateMock = require('./state-mock');

require = require('esm')(module);
const DestinationInput = require('./DestinationInput');
const html = require('./html');

afterEach(() => fetchMock.reset());

let actions, output, render;
beforeEach(
  () =>
    ({ actions, output, render } = stateMock(
      html`
        <${DestinationInput} pocket=${{ currency: 'USD', sum: 100 }} />
      `
    ))
);

test('check if the destination input is initially hidden', () =>
  expect(output()).toMatchInlineSnapshot(`
<span class="DestinationInput animated hidden">
  <default
    prefix=""
    setAmount={[Function anonymous]}
    tabindex="-1"
  >
  </default>
</span>
`));

test('show the destination input', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  render();
  expect(output()).toMatchInlineSnapshot(`
<span class="DestinationInput animated">
  <default
    max={130.78973457531265}
    prefix=""
    setAmount={[Function anonymous]}
    tabindex="-1"
  >
  </default>
</span>
`);
});

test('set the destination input value by the amount of money for exchange', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  actions.setAmount(100);
  render();
  expect(output()).toMatchInlineSnapshot(`
<span class="DestinationInput animated">
  <default
    max={130.78973457531265}
    prefix="+"
    setAmount={[Function anonymous]}
    tabindex="-1"
    value={130.79}
  >
  </default>
</span>
`);
});
