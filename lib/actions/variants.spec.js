import test from 'tape';
import sinon from 'sinon';
import {
  ADD_OPTION,
  REMOVE_OPTION,
  ADD_OPTION_VALUE,
  REMOVE_OPTION_VALUE,
  CALCULATE_PRODUCT
} from '../constants/variants';
import {
  addOption,
  removeOption,
  addOptionValue,
  removeOptionValue,
  calculateProduct
} from '../actions/variants';

const describe = test;

describe('actions', (nest) => {

  const test = nest.test;

  test('add option', (assert) => {
    assert.looseEqual(addOption(), {
      type: ADD_OPTION,
      name: '',
      values: []
    },
    'it should produce the `add option` action');
    assert.end();
  });

  test('remove option', (assert) => {
    assert.looseEqual(removeOption(123), {
      type: REMOVE_OPTION,
      id: 123
    },
    'it should produce the `remove option` action');
    assert.end();
  });

  test('add option value', (assert) => {
    const execute = addOptionValue(123, 'foo');
    const dispatch = sinon.spy();
    const state = { options: [] };
    execute(dispatch, () => state);
    assert.looseEqual(dispatch.args[0][0], {
      type: ADD_OPTION_VALUE,
      value: 'foo',
      id: 123
    },
    'it should produce the `add option value` action');
    assert.end();
  });

  test('add option value (disallow duplication)', (assert) => {
    const execute = addOptionValue(123, 'foo');
    const dispatch = sinon.spy();
    const state = {
      options: [{
        id: 123,
        name: 'foo',
        values: ['foo']
      }]
    };
    assert.equal(
      execute(dispatch, () => state),
      false,
      'it should return false because the operation didn`t succeed'
    );
    assert.looseEqual(
      dispatch.args.length,
      0,
      'it should not call dispatch'
    );
    assert.end();
  });

  test('remove option value', (assert) => {
    assert.looseEqual(removeOptionValue(456, 'bar'), {
      type: REMOVE_OPTION_VALUE,
      value: 'bar',
      id: 456,
    },
    'it should produce the `remove option value` action');
    assert.end();
  });

  test('calculate product', (assert) => {
    assert.looseEqual(calculateProduct(), {
      type: CALCULATE_PRODUCT
    },
    'it should produce the `calculate product` action');
    assert.end();
  });
});
