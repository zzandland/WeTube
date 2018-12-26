import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { socketInit, socketEmit } from './actions/websockets';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './containers/App';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(socketEmit)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

socketInit(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#container'),
);
