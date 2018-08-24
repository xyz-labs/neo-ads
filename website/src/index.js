import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

import App from './components/App/App';
import './index.css';

// Retrieved from https://github.com/supasate/connected-react-router/blob/master/examples/immutable/src/index.js
const history = createBrowserHistory();

const initialState = Immutable.Map()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
    ),
    applyMiddleware(thunk)
  ),
)

ReactDOM.render(
    (
    <Provider store={store}>
        <App history={history} />
    </Provider>
    ), 
    document.getElementById('root')
);

registerServiceWorker();
