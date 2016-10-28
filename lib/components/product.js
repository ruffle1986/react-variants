import React from 'react';

const Product = ({ value, colors = [] }) => (
  <table className="variants-product">
    <thead>
      <tr>
        <th>Variant</th>
        <th>Price</th>
        <th>SKU</th>
      </tr>
    </thead>
    <tbody>
      { value.map((items, i) => (
        <tr key={ `product-items-${i}` } className="variants-product-item">
          <td>
            {
              items.map(
                (item, j) => (
                  <span key={ `product-item-${j}` }>
                    <span
                      className="variants-product-item-value"
                      style={ { color: colors[j % colors.length] } }
                    >
                      { item }
                    </span>
                    { j < items.length - 1 ? ' / ' : '' }
                  </span>
                )
              )
            }
          </td>
          <td><input type="text" placeholder="0" /></td>
          <td><input type="text" /></td>
        </tr>
      )) }
    </tbody>
  </table>
);

Product.displayName = 'Product';

export default Product;
