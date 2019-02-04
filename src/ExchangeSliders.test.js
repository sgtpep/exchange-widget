const stateMock = require('./state-mock');

require = require('esm')(module);
const ExchangeSliders = require('./ExchangeSliders');
const html = require('./html');

let output;
beforeEach(
  () =>
    ({ output } = stateMock(
      html`
        <${ExchangeSliders} />
      `
    ))
);

test('render exchange sliders', () =>
  expect(output()).toMatchInlineSnapshot(`
<div class="ExchangeSliders">
  <default
    index={0}
    onMount={[Function anonymous]}
    onSlide={[Function anonymous]}
  >
    <default
      pocket={
        Object {
          "currency": "GBP",
          "sum": 100
        }
      }
      type="source"
    >
    </default>
    <default
      pocket={
        Object {
          "currency": "EUR",
          "sum": 200
        }
      }
      type="source"
    >
    </default>
    <default
      pocket={
        Object {
          "currency": "USD",
          "sum": 300
        }
      }
      type="source"
    >
    </default>
  </default>
  <default
    index={1}
    onSlide={[Function anonymous]}
  >
    <default
      pocket={
        Object {
          "currency": "GBP",
          "sum": 100
        }
      }
      type="destination"
    >
    </default>
    <default
      pocket={
        Object {
          "currency": "EUR",
          "sum": 200
        }
      }
      type="destination"
    >
    </default>
    <default
      pocket={
        Object {
          "currency": "USD",
          "sum": 300
        }
      }
      type="destination"
    >
    </default>
  </default>
</div>
`));
