const fetchMock = require('fetch-mock');
const stateMock = require('./state-mock');

require = require('esm')(module);
const Header = require('./Header');
const html = require('./html');

afterEach(() => fetchMock.reset());

let actions, context, render;
let destroy, exchange;
beforeEach(() => {
  [destroy, exchange] = [jest.fn(), jest.fn()];
  ({ actions, context, render } = stateMock(
    html`
      <${Header} destroy=${destroy} exchange=${exchange} />
    `
  ));
});

describe('exchange button disableness', () => {
  const button = () => context.find('button').at(1);

  test('check if the exchange button is disabled initially', () =>
    expect(button().attr('disabled')).toBeTruthy());

  test('enable the exchange button', async () => {
    fetchMock.getOnce('rates', require('../mocks/rates'));
    await actions.fetchRates('rates');
    render();
    expect(button().attr('disabled')).toBeTruthy();
    actions.setAmount(100);
    render();
    expect(button().attr('disabled')).toBeFalsy();
  });
});

test('click on the cancel button', async () => {
  context
    .find('button')
    .at(0)
    .simulate('click');
  expect(destroy).toBeCalled();
});

test('click on the exchange button', async () => {
  fetchMock.getOnce('rates', require('../mocks/rates'));
  await actions.fetchRates('rates');
  actions.setAmount(100);
  context
    .find('button')
    .at(1)
    .simulate('click');
  render();
  expect(exchange).toBeCalled();
});
