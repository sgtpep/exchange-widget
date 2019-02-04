const { shallow } = require('preact-render-spy');

require = require('esm')(module);
const LoadingIndicator = require('./LoadingIndicator');
const html = require('./html');

test('show a loading indicator', () => {
  expect(
    shallow(
      html`
        <${LoadingIndicator} visible />
      `
    ).output()
  ).toMatchInlineSnapshot(`<div class="LoadingIndicator animated"></div>`);
});

test('hide a loading indicator', () => {
  expect(
    shallow(
      html`
        <${LoadingIndicator} />
      `
    ).output()
  ).toMatchInlineSnapshot(
    `<div class="LoadingIndicator animated hidden"></div>`
  );
});
