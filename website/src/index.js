import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter, ConnectedRouter } from 'connected-react-router/immutable'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger';
import { setupNeonJS } from './lib/neon';
import { isBrowser, isProduction } from './lib/constants';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

import App from './components/App/App';
import './index.css';

// Retrieved from https://github.com/supasate/connected-react-router/blob/master/examples/immutable/src/index.js
const history = createBrowserHistory({basename: process.env.PUBLIC_URL});

const initialState = Immutable.Map()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let finalCompose = compose(applyMiddleware(thunk), applyMiddleware(routerMiddleware(history)))

// Create logger
if (isBrowser && !isProduction) {
    const stateTransformer = state => {
        if (state instanceof Immutable.Iterable) {
            return state.toJS();
        } else {
            return state;
        }
    };

    const logger = createLogger({
        stateTransformer,
    });

    finalCompose = compose(finalCompose, applyMiddleware(logger))
}

const store = createStore(
    connectRouter(history)(rootReducer), 
    initialState,
    composeEnhancer(
      finalCompose
    ),
);

setupNeonJS()

ReactDOM.render(
    (
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
    </Provider>
    ), 
    document.getElementById('root')
);

registerServiceWorker();
