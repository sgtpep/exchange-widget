const fetchMock = require('fetch-mock');
const fs = require('fs');

require = require('esm')(module);
const state = require('./state');

const eurPocket = { currency: 'EUR', sum: 100 };
const rates = [
  { currency: 'EUR', rate: 0.874485 },
  { currency: 'GBP', rate: 0.764586 },
];
const ratesResponse = require('../mocks/rates');
const usdPocket = { currency: 'USD', sum: 100 };

afterEach(() => fetchMock.reset());

let actions;
const onState = jest.fn();
beforeEach(() => {
  delete require.cache[require.resolve('./actions')];
  actions = require('./actions');
  actions.default(onState);
});

describe('rates loading', () => {
  test('start loading rates', () => {
    fetchMock.getOnce('rates', ratesResponse);
    actions.fetchRates('rates');
    expect(onState).lastCalledWith({ ...state, ratesLoading: true });
  });

  test('load rates successfully', async () => {
    fetchMock.getOnce('rates', ratesResponse);
    await expect(actions.fetchRates('rates')).resolves.toEqual(ratesResponse);
    expect(onState).lastCalledWith({ ...state, rates });
  });

  test('fail loading rates', async () => {
    fetchMock.getOnce('rates', 404);
    await expect(actions.fetchRates('rates')).rejects.toBeUndefined();
    expect(onState).lastCalledWith({ ...state, ratesError: true });
  });

  test('load rates consecutively', async () => {
    fetchMock.getOnce('rates', ratesResponse);
    await expect(actions.fetchRates('rates')).resolves.toEqual(ratesResponse);
    expect(onState).lastCalledWith({ ...state, rates });
    fetchMock.getOnce('rates2', 404);
    await expect(actions.fetchRates('rates2')).rejects.toBeUndefined();
    expect(onState).lastCalledWith({ ...state, rates, ratesError: true });
    fetchMock.getOnce('rates3', ratesResponse);
    await expect(actions.fetchRates('rates3')).resolves.toEqual(ratesResponse);
    expect(onState).lastCalledWith({ ...state, rates });
  });

  test('try to load rates from multiple sources', async () => {
    fetchMock.getOnce('foo', 404);
    fetchMock.getOnce('bar', 404);
    fetchMock.getOnce('rates', ratesResponse);
    fetchMock.getOnce('baz', 404);
    await expect(
      actions.fetchRates(['foo', 'bar', 'rates', 'baz'])
    ).resolves.toEqual(ratesResponse);
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
  await expect(promise).resolves.toBeTruthy();
  expect(onState).lastCalledWith({ ...state, exchangeLoading: false });
});

test('set amount', () => {
  const amount = 100;
  actions.setAmount(amount);
  expect(onState).lastCalledWith({ ...state, amount });
});

test('set the destination pocket', () => {
  actions.setDestinationPocket(usdPocket);
  expect(onState).lastCalledWith({ ...state, destinationPocket: usdPocket });
});

test('set pockets', () => {
  const pockets = [usdPocket];
  actions.setPockets(pockets);
  expect(onState).lastCalledWith({ ...state, pockets });
});

describe('source pocket', () => {
  test('set the source pocket', () => {
    actions.setSourcePocket(usdPocket);
    expect(onState).lastCalledWith({ ...state, sourcePocket: usdPocket });
  });

  test('set the source pocket with sum lower than current amount', () => {
    actions.setAmount(200);
    actions.setSourcePocket(usdPocket);
    expect(onState).lastCalledWith({
      ...state,
      amount: usdPocket.sum,
      sourcePocket: usdPocket,
    });
  });
});

describe('rates hiding', async () => {
  beforeEach(async () => {
    fetchMock.getOnce('rates', ratesResponse);
    await actions.fetchRates('rates');
  });

  test('hide rates if the destination pocket is not set', () => {
    actions.setSourcePocket(usdPocket);
    expect(onState).lastCalledWith({
      ...state,
      rates,
      sourcePocket: usdPocket,
    });
  });

  test('hide rates if the source pocket is not set', () => {
    actions.setDestinationPocket(usdPocket);
    expect(onState).lastCalledWith({
      ...state,
      destinationPocket: usdPocket,
      rates,
    });
  });

  test('hide rates if the destination and source pockets have the same currency', () => {
    actions.setDestinationPocket(usdPocket);
    actions.setSourcePocket(usdPocket);
    expect(onState).lastCalledWith({
      ...state,
      destinationPocket: usdPocket,
      rates,
      sourcePocket: usdPocket,
    });
  });

  test('show rates if the destination and source pockets have different currencies', () => {
    actions.setDestinationPocket(eurPocket);
    actions.setSourcePocket(usdPocket);
    expect(onState).lastCalledWith({
      ...state,
      destinationPocket: eurPocket,
      rates,
      ratesHidden: false,
      sourcePocket: usdPocket,
    });
  });
});
