import React, { PropTypes } from 'react';

const { string, func } = PropTypes;

let VariantOptionValue = ({
  value,
  color,
  onClick,
}) => (
  <li
    className="variants-option-value"
    style={ { backgroundColor: color } }
    onClick={ e => e.stopPropagation() }
  >
    <span className="variants-option-value-label">
      { value }
    </span>
    <a className="variants-option-value-remove"
       title="Remove value"
       onClick={ onClick }
    >
      <i className="ion-android-close" />
    </a>
  </li>
);

VariantOptionValue.displayName = 'VariantOptionValue';

VariantOptionValue.propTypes = {
  value: string,
  color: string,
  onClick: func
};

export default VariantOptionValue;
