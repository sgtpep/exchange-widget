const fetchMock = require('fetch-mock');
const stateMock = require('./state-mock');

require = require('esm')(module);
const RateDropdown = require('./RateDropdown');
const html = require('./html');

afterEach(() => fetchMock.reset());

let actions, context, output, render;
beforeEach(
  () =>
    ({ actions, context, output, render } = stateMock(
      html`
        <${RateDropdown} />
      `
    ))
);

test('check if the rate dropdown is hidden initially', () =>
  expect(output()).toEqual(
    html`
      <span class="RateDropdown animated hidden">
        <span class="button">${''}</span>
        <${expect.any(Function)}/>
      </span>
    `
  ));

test('show the rate dropdown', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  render();
  expect(output()).toEqual(
    html`
      <span class="RateDropdown animated">
        <span class="button">£1 = €1.1437</span>
        <${expect.any(Function)}/>
      </span>
    `
  );
});
