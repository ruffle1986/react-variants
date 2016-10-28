import React, { PropTypes } from 'react';
import VariantOption from './variants-option';
import Product from './product';

const { string, array, number, func, object } = PropTypes;

let Variants = ({
  options,
  optionsLimit,
  onAddOptionClick,
  error,
  product,
  colors,
  variantOptionActions,
  productColors
}) => (
  <div className="variants">
    { options && options.length ? (
      <table className="variants-options">
        <thead>
          <tr>
            <th>Option name</th>
            <th>Option values</th>
            <th>{ ' ' }</th>
          </tr>
        </thead>
        <tbody>
          { options.map((option, i) => {
            return (
              <VariantOption
                key={ option.id }
                { ...option }
                { ...variantOptionActions }
                showRemove={ options.length > 1 }
                color={ colors[i % colors.length] }
              />
            );
          }) }
        </tbody>
      </table>
    ) : '' }
    <div className="error">{ error }</div>
    { !optionsLimit || optionsLimit > options.length ? (
      <a className="variants-add-option" onClick={ onAddOptionClick }>
        <i className="add-icon ion-android-add-circle" /> Add option
      </a>
    ) : '' }
    { product && product.length ? (
      <Product
        colors={ productColors }
        value={ product }
      />
    ) : '' }
  </div>
);

Variants.displayName = 'Variants';

Variants.propTypes = {
  error: string,
  options: array,
  optionsLimit: number,
  product: array,
  colors: array,
  onAddOptionClick: func,
  variantOptionActions: object
};

export default Variants;
