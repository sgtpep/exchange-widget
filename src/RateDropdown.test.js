const fetchMock = require('fetch-mock');
const stateMock = require('./state-mock');

require = require('esm')(module);
const RateDropdown = require('./RateDropdown');
const html = require('./html');

afterEach(() => fetchMock.reset());

let actions, output, render;
beforeEach(
  () =>
    ({ actions, output, render } = stateMock(
      html`
        <${RateDropdown} />
      `
    ))
);

test('check if the rate dropdown is hidden initially', () =>
  expect(output()).toMatchInlineSnapshot(`
<span class="RateDropdown animated hidden">
  <span class="button"></span>
  <default></default>
</span>
`));

test('show the rate dropdown', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  render();
  expect(output()).toMatchInlineSnapshot(`
<span class="RateDropdown animated">
  <span class="button">£1 = €1.1437</span>
  <default></default>
</span>
`);
});
