import Variants from '../components/variants';
import { connect } from 'react-redux';
import {
  addOption,
  removeOption,
  addOptionValue,
  removeOptionValue
} from '../actions/variants';
import {
  KEY_TAB,
  KEY_BACKSPACE,
  KEY_COMMA,
  KEY_ENTER
} from '../constants/keys';

const keysToAddOptionValue = [
  KEY_TAB,
  KEY_COMMA,
  KEY_ENTER
];

function stopPropagation(e) {
  e.stopPropagation();
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddOptionClick(e) {
    e.preventDefault();
    dispatch(addOption());
  },
  variantOptionActions: {
    onRemoveOptionClick({ e, id }) {
      e.preventDefault();
      dispatch(removeOption(id));
    },
    onOptionValuesKeyUp({ e, id }) {
      e.preventDefault();
      const { keyCode } = e;
      const input = e.target;
      const { value } = input;
      if (keysToAddOptionValue.indexOf(keyCode) !== -1 && value) {
        if (dispatch(addOptionValue(id, value))) {
          input.value = '';
        }
      }
    },
    onOptionValuesKeyDown({ e, id, values }) {
      const input = e.target;
      const { value } = input;
      if (value && (e.keyCode === KEY_TAB || e.keyCode === KEY_COMMA)) {
        e.preventDefault();
      }
      if (!value && e.keyCode === KEY_BACKSPACE) {
        dispatch(removeOptionValue(id, values[values.length - 1]));
      }
    },
    onOptionValuesBlur({ e, id }) {
      const input = e.target;
      const { value } = input;
      if (value && dispatch(addOptionValue(id, value)) && value) {
        input.value = '';
      }
    },
    onOptionValueRemoveClick({ e, value, id }) {
      e.preventDefault();
      stopPropagation(e);
      dispatch(removeOptionValue(id, value));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Variants);
