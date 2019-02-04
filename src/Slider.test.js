const { shallow } = require('preact-render-spy');

require = require('esm')(module);
const Slider = require('./Slider');
const html = require('./html');

test('renders slides and pagination', async () =>
  expect(
    shallow(html`
      <${Slider}>
        <div>foo</div>
        <div>bar</div>
        <div>baz</div>
      <//>
    `)
  ).toMatchInlineSnapshot(`
preact-render-spy (1 nodes)
-------
<div class="Slider">
  <div style="width: 500%;">
    <div style="width: 20%;">
      <div>baz</div>
    </div>
    <div style="width: 20%;">
      <div>foo</div>
    </div>
    <div style="width: 20%;">
      <div>bar</div>
    </div>
    <div style="width: 20%;">
      <div>baz</div>
    </div>
    <div style="width: 20%;">
      <div>foo</div>
    </div>
  </div>
  <nav>
    <a onClick={[Function anonymous]}>1</a>
     
    <a onClick={[Function anonymous]}>2</a>
     
    <a onClick={[Function anonymous]}>3</a>
     
  </nav>
</div>

`));
