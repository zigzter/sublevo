import { createStore, combineReducers, applyMiddleware } from 'redux';
import apiMiddleWare from '../middleware/api';
import currentUserReducer from '../reducers/currentUser';
import apiReducer from '../reducers/api';

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    api: apiReducer,
});

const store = createStore(rootReducer, applyMiddleware(apiMiddleWare))

export default store;
