import React from 'react';
import PropTypes from 'prop-types';
import VariantOptionValue from './variants-option-value';

const { number, string, bool, func, array } = PropTypes;

let VariantOption = ({
  name,
  values = [],
  id,
  showRemove = true,
  color,
  onRemoveOptionClick,
  onOptionValuesKeyUp,
  onOptionValuesKeyDown,
  onOptionValueRemoveClick,
  onOptionValuesBlur
}) => {
  let optionValuesInput;
  return (
    <tr className="variants-option">
      <td className="variants-option-name">
        <input type="text" defaultValue={ name } />
      </td>
      <td className="variants-option-values">
        <ul onClick={
              () => {
                if (typeof optionValuesInput.focus === 'function') {
                  optionValuesInput.focus();
                }
              }
            }
        >
          {
            values.map(value => {
              const props = {
                color,
                value,
                onClick(e) {
                  onOptionValueRemoveClick({ e, value, id });
                }
              };
              return (
                <VariantOptionValue key={ value } { ...props } />
              );
            })
          }
          <li>
            <input
              type="text"
              ref={ (input) => optionValuesInput = input }
              onKeyDown={ (e) => onOptionValuesKeyDown({ e, id, values }) }
              onKeyUp={ (e) => onOptionValuesKeyUp({ e, id }) }
              onBlur={ (e) => onOptionValuesBlur({ e, id }) }
              autoComplete="off"
            />
          </li>
        </ul>
      </td>
      <td>
        { showRemove ? (
          <a className="variants-option-remove"
             title="Remove option"
             onClick={ (e) => onRemoveOptionClick({ e, id }) }
          >
            <i className="ion-trash-b" />
          </a>
        ) : '' }
      </td>
    </tr>
  );
};

VariantOption.displayName = 'VariantOption';

VariantOption.propTypes = {
  id: number.isRequired,
  name: string,
  values: array,
  showRemove: bool,
  color: string,
  onRemoveOptionClick: func,
  onOptionValuesKeyUp: func,
  onOptionValuesKeyDown: func,
  onOptionValueRemoveClick: func,
  onOptionValuesBlur: func
};

export default VariantOption;
