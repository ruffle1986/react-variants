import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Variants from './variants';

const { object } = PropTypes;

export default React.createClass({
  displayName: 'VariantsContainer',
  propTypes: {
    store: object.isRequired
  },
  render() {
    return (
      <Provider store={ this.props.store }>
        <Variants />
      </Provider>
    );
  }
});
