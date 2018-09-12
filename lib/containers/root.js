import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Variants from './variants';

const { object } = PropTypes;

class Root extends React.Component {

  render() {
    return (
      <Provider store={ this.props.store }>
        <Variants />
      </Provider>
    );
  }
}

Root.displayName = 'VariantsContainer';

Root.propTypes = {
  store: object.isRequired
};

export default Root;
