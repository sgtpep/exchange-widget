const { deep } = require('preact-render-spy');

require = require('esm')(module);
const html = require('./html');

module.exports = (children, depth = 2) => {
  const [actions, State] = ['./actions', './State'].map(id => {
    delete require.cache[require.resolve(id)];
    return require(id);
  });
  const node = html`
    <${State}
      pockets=${[
        { currency: 'GBP', sum: 100 },
        { currency: 'EUR', sum: 200 },
        { currency: 'USD', sum: 300 },
      ]}
    >
      ${children}
    <//>
  `;
  const context = deep(node, { depth });
  return {
    actions,
    context,
    output: () => context.childAt(0).output(),
    render: () => context.render(node),
  };
};
