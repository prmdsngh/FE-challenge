import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import configureStore from './app/store/configureStore';
import './index.scss';
import {compose} from 'redux';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(composeEnhancer());

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
