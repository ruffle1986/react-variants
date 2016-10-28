import Variants from '../lib/containers/root';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../lib/reducers/variants';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer, Object.assign({
  options: [],
  optionsLimit: 3,
  product: [],
  colors: ['#0073CF', '#966FD6', '#FF6E4A']
}, {
  options: [
    {
      id: 1,
      name: 'Size'
    }
  ]
}));

ReactDOM.render(
  <Variants store={ store } />,
  document.getElementById('root')
);
