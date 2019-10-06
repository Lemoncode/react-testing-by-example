import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { history } from '../router';
import { createRootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}) =>
  createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
export const store = configureStore();

sagaMiddleware.run(rootSaga);
