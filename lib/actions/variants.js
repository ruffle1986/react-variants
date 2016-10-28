import {
  ADD_OPTION,
  REMOVE_OPTION,
  ADD_OPTION_VALUE,
  REMOVE_OPTION_VALUE,
  CALCULATE_PRODUCT
} from '../constants/variants';

export function addOption() {
  return {
    type: ADD_OPTION,
    name: '',
    values: []
  };
}
export function removeOption(id) {
  return {
    type: REMOVE_OPTION,
    id,
  };
}

export function addOptionValue(id, value) {
  return (dispatch, getState) => {
    const option = getState().options.filter(option => option.id === id)[0];
    let optionValue;
    if (option && option.values) {
      optionValue = option.values.filter((val) => val === value)[0];
    }
    if (optionValue) {
      return false;
    }
    return dispatch({
      type: ADD_OPTION_VALUE,
      value,
      id
    });
  };
}

export function removeOptionValue(id, value) {
  return {
    type: REMOVE_OPTION_VALUE,
    value,
    id,
  };
}

export function calculateProduct() {
  return {
    type: CALCULATE_PRODUCT
  };
}
