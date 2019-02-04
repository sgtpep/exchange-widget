const { shallow } = require('preact-render-spy');

require = require('esm')(module);
const CurrencyInput = require('./CurrencyInput');
const html = require('./html');

test('render a currency input', () =>
  expect(
    shallow(html`
      <${CurrencyInput} prefix="+" tabindex="-1" value="100" />
    `).output()
  ).toMatchInlineSnapshot(`
<span class="CurrencyInput">
  <span>
    +
    <span></span>
  </span>
  <input
    min="0"
    onInput={[Function anonymous]}
    onKeyDown={[Function anonymous]}
    step="any"
    tabindex="-1"
    type="number"
    value="100"
   />
</span>
`));
