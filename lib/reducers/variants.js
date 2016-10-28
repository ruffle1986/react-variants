import {
  ADD_OPTION,
  REMOVE_OPTION,
  ADD_OPTION_VALUE,
  REMOVE_OPTION_VALUE,
  CALCULATE_PRODUCT
} from '../constants/variants';
import product from 'compute-product';

function calculateProductColors(colors = [], options = []) {
  return colors.filter(
    (color, i) =>
      !options[i] || (options[i].values && options[i].values.length)
  );
}

function addOption(state = [], action) {
  return [...state, {
    id: state.reduce(
      (id, option) => Math.max(id, option.id), -1
    ) + 1,
    name: action.name
  }];
}

function removeOption(state = [], action) {
  return state.filter(({ id }) => id !== action.id);
}

function addOptionValue(state = [], action) {
  return state.map((option) => {
    if (action.id !== option.id) {
      return option;
    }
    const { values } = option;
    return {
      ...option,
      values: values.filter((value) => value !== action.value)
    };
  });
}

function removeOptionValue(state, action) {
  return state.map((option) => {
    if (action.id !== option.id) {
      return option;
    }
    const { values = [] } = option;
    return {
      ...option,
      values: [...values, action.value]
    };
  });
}

function calculateProduct(options) {
  const allValues = options.reduce(
    (current, { values = [] }) => {
      if (values.length) {
        return current.concat([values]);
      }
      return current;
    },
    []
  );
  return allValues.length ? product(allValues) : [];
}

export default (state, action) => {
  let options;
  switch (action.type) {
    case ADD_OPTION:
    options = addOption(state.options, action);
    return {
      ...state,
      options,
      product: calculateProduct(options)
    };
    case REMOVE_OPTION:
    options = removeOption(state.options, action);
    return {
      ...state,
      options,
      product: calculateProduct(options),
      productColors: calculateProductColors(state.colors, options)
    };
    case REMOVE_OPTION_VALUE:
    options = addOptionValue(state.options, action);
    return {
      ...state,
      options,
      product: calculateProduct(options),
      productColors: calculateProductColors(state.colors, options)
    };
    case ADD_OPTION_VALUE:
    options = removeOptionValue(state.options, action);
    return {
      ...state,
      options,
      product: calculateProduct(options),
      productColors: calculateProductColors(state.colors, options)
    };
    case CALCULATE_PRODUCT:
    return {
      ...state,
      product: calculateProduct(state.options)
    };
    default:
    return state;
  }
};
