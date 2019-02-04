const { shallow } = require('preact-render-spy');

require = require('esm')(module);
const ExchangeSlide = require('./ExchangeSlide');
const html = require('./html');

test('render a slide for an exchange source', () =>
  expect(
    shallow(html`
      <${ExchangeSlide} pocket=${{ currency: 'USD', sum: 100 }} type="source" />
    `).output()
  ).toMatchInlineSnapshot(`
<div class="ExchangeSlide">
  <div>
    <div class="ExchangeSlide-currency">USD</div>
    <default
      pocket={
        Object {
          "currency": "USD",
          "sum": 100
        }
      }
    >
    </default>
  </div>
  <div>
    <div>You have $100.00</div>
  </div>
</div>
`));

test('render a slide for an exchange destination', () =>
  expect(
    shallow(html`
      <${ExchangeSlide}
        pocket=${{ currency: 'EUR', sum: 200 }}
        type="destination"
      />
    `).output()
  ).toMatchInlineSnapshot(`
<div class="ExchangeSlide">
  <div>
    <div class="ExchangeSlide-currency">EUR</div>
    <Component
      pocket={
        Object {
          "currency": "EUR",
          "sum": 200
        }
      }
    >
    </Component>
  </div>
  <div>
    <div>You have €200.00</div>
    <Component
      pocket={
        Object {
          "currency": "EUR",
          "sum": 200
        }
      }
    >
    </Component>
  </div>
</div>
`));
