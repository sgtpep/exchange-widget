const { shallow } = require('preact-render-spy');

require = require('esm')(module);
const animatedHideable = require('./animated-hideable');
const html = require('./html');

let cached, context, hidden, render;
beforeEach(() => {
  [cached, hidden] = [jest.fn(), jest.fn()];
  const Component = animatedHideable(
    hidden,
    cached,
    props =>
      html`
        <div hidden=${props.hidden}>${props.text}</div>
      `
  );
  hidden.mockReturnValueOnce(false);
  cached.mockReturnValueOnce({ text: 'foo' });
  context = shallow(
    html`
      <${Component} />
    `
  );
  render = () =>
    context.render(html`
      <${Component} />
    `);
});

test("cache props and don't change hidden prop until hiding", () => {
  expect(context.output()).toMatchInlineSnapshot(
    `<div hidden={false}>foo</div>`
  );
  hidden.mockReturnValueOnce(false);
  cached.mockReturnValueOnce({ text: 'bar' });
  render();
  expect(context.output()).toMatchInlineSnapshot(
    `<div hidden={false}>bar</div>`
  );
});

test('cache props and set hidden prop on hiding', () => {
  hidden.mockReturnValueOnce(true);
  cached.mockReturnValueOnce({ text: 'bar' });
  render();
  expect(context.output()).toMatchInlineSnapshot(
    `<div hidden={true}>foo</div>`
  );
});
