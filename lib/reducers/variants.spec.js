import test from 'tape';
import fn from './variants';
import {
  ADD_OPTION,
  REMOVE_OPTION,
  ADD_OPTION_VALUE,
  REMOVE_OPTION_VALUE,
  CALCULATE_PRODUCT
} from '../constants/variants';
import deepFreeze from 'deep-freeze';

const describe = test;

describe('reducer', (nest) => {
  const test = nest.test;

  test('add option', (assert) => {
    let state = {};
    deepFreeze(state);
    let newState = fn(state, { type: ADD_OPTION, name: 'foo' });

    assert.looseEqual(newState, {
      options: [{ name: 'foo', id: 0 }]
    },
    'it should add the option and start id from zero');

    state = {
      options: [{ name: 'foo', id: 0 }]
    };
    deepFreeze(state);
    newState = fn(state, { type: ADD_OPTION, name: 'bar' });

    assert.looseEqual(newState, {
      options: [
        { name: 'foo', id: 0 },
        { name: 'bar', id: 1 }
      ]
    },
    'it should append a new option with an incremented id');

    assert.end();
  });

  test('remove option', (assert) => {
    const state = {
      options: [
        { name: 'foo', id: 0 },
        { name: 'bar', id: 1 },
        { name: 'baz', id: 2 },
      ]
    };

    deepFreeze(state);

    const newState = fn(state, { type: REMOVE_OPTION, id: 1 });

    assert.looseEqual(newState, {
      options: [
        { name: 'foo', id: 0 },
        { name: 'baz', id: 2 },
      ]
    },
    'it should remove the selected option');

    assert.end();
  });

  test('add option value', (assert) => {
    const state = {
      options: [
        {
          name: 'foo',
          id: 1
        }
      ]
    };
    deepFreeze(state);
    const newState = fn(state, { type: ADD_OPTION_VALUE, id: 1, value: 'bar' });

    assert.looseEqual(newState, {
      options: [
        {
          name: 'foo',
          values: ['bar'],
          id: 1
        }
      ]
    });

    assert.end();
  });

  test('remove option value', (assert) => {
    var state = {
      options: [
        {
          name: 'foo',
          values: ['bar', 'baz'],
          id: 1
        },
        {
          name: 'xy',
          values: ['wq', 'tz'],
          id: 2
        }
      ]
    };
    deepFreeze(state);
    const newState = fn(state, {
      type: REMOVE_OPTION_VALUE, id: 2, value: 'wq'
    });
    assert.looseEqual(newState, {
      options: [
        {
          name: 'foo',
          values: ['bar', 'baz'],
          id: 1
        },
        {
          name: 'xy',
          values: ['tz'],
          id: 2
        }
      ]
    });
    assert.end();
  });

  test('calculate product', (assert) => {
    var state = {
      options: [
        {
          name: 'foo',
          values: ['bar', 'baz'],
          id: 1
        },
        {
          name: 'xy',
          values: ['wq', 'tz'],
          id: 2
        }
      ]
    };
    deepFreeze(state);
    const newState = fn(state, { type: CALCULATE_PRODUCT });
    assert.looseEqual(newState, {
      options: [
        {
          name: 'foo',
          values: ['bar', 'baz'],
          id: 1
        },
        {
          name: 'xy',
          values: ['wq', 'tz'],
          id: 2
        }
      ],
      product: [['bar', 'wq'], ['bar', 'tz'], ['baz', 'wq'], ['baz', 'tz']]
    });
    assert.end();
  });
});
