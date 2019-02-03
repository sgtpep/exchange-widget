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
      `,
  );
  hidden.mockReturnValueOnce(false);
  cached.mockReturnValueOnce({ text: 'foo' });
  context = shallow(
    html`
      <${Component} />
    `,
  );
  render = () =>
    context.render(html`
      <${Component} />
    `);
});

test('props are not cached and hidden prop is not set until hiding', () => {
  expect(context.output()).toEqual(
    html`
      <div hidden=${false}>foo</div>
    `,
  );
  hidden.mockReturnValueOnce(false);
  cached.mockReturnValueOnce({ text: 'bar' });
  render();
  expect(context.output()).toEqual(
    html`
      <div hidden=${false}>bar</div>
    `,
  );
});

test('props are cached and hidden prop is set on hiding', () => {
  hidden.mockReturnValueOnce(true);
  cached.mockReturnValueOnce({ text: 'bar' });
  render();
  expect(context.output()).toEqual(
    html`
      <div hidden>foo</div>
    `,
  );
});
