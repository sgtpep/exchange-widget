const fetchMock = require('fetch-mock');
const stateMock = require('./state-mock');

require = require('esm')(module);
const DestinationRate = require('./DestinationRate');
const html = require('./html');

afterEach(() => fetchMock.reset());

let actions, context, output, render;
beforeEach(
  () =>
    ({ actions, context, output, render } = stateMock(
      html`
        <${DestinationRate} pocket=${{ currency: 'USD', sum: 100 }} />
      `
    ))
);

test('check if an exchange rate is hidden initially', () =>
  expect(output()).toEqual(
    html`
      <span class="DestinationRate animated hidden">${''}</span>
    `
  ));

test('display an exchange rate', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  actions.setAmount(100);
  render();
  expect(output()).toEqual(
    html`
      <span class="DestinationRate animated">$1 = £0.76</span>
    `
  );
});
