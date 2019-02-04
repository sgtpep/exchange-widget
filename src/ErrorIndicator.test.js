const { shallow } = require('preact-render-spy');

require = require('esm')(module);
const ErrorIndicator = require('./ErrorIndicator');
const html = require('./html');

test('show an error indicator', () => {
  expect(
    shallow(
      html`
        <${ErrorIndicator} visible>error<//>
      `
    ).output()
  ).toMatchInlineSnapshot(`
<div class="ErrorIndicator animated">
  <div>error</div>
</div>
`);
});

test('hide an error indicator', () => {
  expect(
    shallow(
      html`
        <${ErrorIndicator}>error<//>
      `
    ).output()
  ).toMatchInlineSnapshot(`
<div class="ErrorIndicator animated hidden">
  <div>error</div>
</div>
`);
});
