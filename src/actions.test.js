const fetchMock = require('fetch-mock');
const fs = require('fs');

require = require('esm')(module);
const state = require('./state');

let actions;
const onState = jest.fn();
beforeEach(() => {
  delete require.cache[require.resolve('./actions')];
  actions = require('./actions');
  actions.default(onState);
});

describe('rates loading', () => {
  const rates = [
    { currency: 'EUR', rate: 0.874485 },
    { currency: 'GBP', rate: 0.764586 },
  ];
  const response = JSON.parse(fs.readFileSync('./mocks/rates.json', 'utf8'));

  afterEach(() => fetchMock.reset());

  test('start loading rates', () => {
    fetchMock.getOnce('rates', response);
    actions.fetchRates('rates');
    expect(onState).lastCalledWith({ ...state, ratesLoading: true });
  });

  test('load rates successfully', async () => {
    fetchMock.getOnce('rates', response);
    await expect(actions.fetchRates('rates')).resolves.toEqual(response);
    expect(onState).lastCalledWith({ ...state, rates });
  });

  test('fail loading rates', async () => {
    fetchMock.getOnce('rates', 404);
    await expect(actions.fetchRates('rates')).rejects.toBeUndefined();
    expect(onState).lastCalledWith({ ...state, ratesError: true });
  });

  test('load rates consecutively', async () => {
    fetchMock.getOnce('rates', response);
    await expect(actions.fetchRates('rates')).resolves.toEqual(response);
    expect(onState).lastCalledWith({ ...state, rates });
    fetchMock.getOnce('rates2', 404);
    await expect(actions.fetchRates('rates2')).rejects.toBeUndefined();
    expect(onState).lastCalledWith({ ...state, rates, ratesError: true });
    fetchMock.getOnce('rates3', response);
    await expect(actions.fetchRates('rates3')).resolves.toEqual(response);
    expect(onState).lastCalledWith({ ...state, rates });
  });

  test('try to load rates from multiple sources', async () => {
    fetchMock.getOnce('foo', 404);
    fetchMock.getOnce('bar', 404);
    fetchMock.getOnce('rates', response);
    fetchMock.getOnce('baz', 404);
    await expect(
      actions.fetchRates(['foo', 'bar', 'rates', 'baz'])
    ).resolves.toEqual(response);
    expect(fetchMock.calls().map(call => call[0])).toEqual([
      '/foo',
      '/bar',
      '/rates',
    ]);
  });
});

test('exchange currencies', async () => {
  const promise = actions.exchange(100, 0.9, 'USD', 'EUR');
  expect(onState).lastCalledWith({ ...state, exchangeLoading: true });
  await expect(promise).resolves.toBeUndefined();
  expect(onState).lastCalledWith({ ...state, exchangeLoading: false });
});

test('set amount', () => {
  const amount = 100;
  actions.setAmount(amount);
  expect(onState).lastCalledWith({ ...state, amount });
});

test('set the destination pocket', () => {
  const pocket = { currency: 'USD', sum: 100 };
  actions.setDestinationPocket(pocket);
  expect(onState).lastCalledWith({ ...state, destinationPocket: pocket });
});

test('set pockets', () => {
  const pockets = [{ currency: 'USD', sum: 100 }];
  actions.setPockets(pockets);
  expect(onState).lastCalledWith({ ...state, pockets });
});

describe('source pocket', () => {
  test('set the source pocket', () => {
    const pocket = { currency: 'USD', sum: 100 };
    actions.setSourcePocket(pocket);
    expect(onState).lastCalledWith({ ...state, sourcePocket: pocket });
  });

  test('set the source pocket with sum lower than current amount', () => {
    actions.setAmount(200);
    const pocket = { currency: 'USD', sum: 100 };
    actions.setSourcePocket(pocket);
    expect(onState).lastCalledWith({
      ...state,
      amount: pocket.sum,
      sourcePocket: pocket,
    });
  });
});

describe('rates hiding', () => {
  test('', () => {
    // TODO
  });
});
