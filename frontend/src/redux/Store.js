import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import Reducers from './Reducers';

const middleware = [];
const enhancers = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['meReducer', 'authenticationReducer']
};

const persistedReducer = persistReducer(persistConfig, Reducers);

middleware.push(logger);
middleware.push(thunk);
enhancers.push(applyMiddleware(...middleware));

const store = createStore(persistedReducer, {}, composeEnhancers(...enhancers));

const persistor = persistStore(store);

export { store, persistor };
