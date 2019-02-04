const fetchMock = require('fetch-mock');
const stateMock = require('./state-mock');

require = require('esm')(module);
const RateSelect = require('./RateSelect');
const html = require('./html');

afterEach(() => fetchMock.reset());

let actions, context, output, render;
beforeEach(
  () =>
    ({ actions, context, output, render } = stateMock(
      html`
        <${RateSelect} />
      `
    ))
);

test('check if the rate select has no items', () =>
  expect(output()).toMatchInlineSnapshot(`
<select
  class="RateSelect"
  onChange={[Function anonymous]}
>
</select>
`));

test('show the rate select items', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  render();
  expect(output()).toMatchInlineSnapshot(`
<select
  class="RateSelect"
  onChange={[Function anonymous]}
>
  <option
    selected={true}
    value="GBP:EUR"
  >
    £1 = €1.1437
  </option>
  <option
    selected={false}
    value="GBP:USD"
  >
    £1 = $1.3079
  </option>
  <option
    selected={false}
    value="EUR:GBP"
  >
    €1 = £0.8743
  </option>
  <option
    selected={false}
    value="EUR:USD"
  >
    €1 = $1.1435
  </option>
  <option
    selected={false}
    value="USD:GBP"
  >
    $1 = £0.7646
  </option>
  <option
    selected={false}
    value="USD:EUR"
  >
    $1 = €0.8745
  </option>
</select>
`);
});
