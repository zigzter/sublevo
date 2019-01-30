import { createStore, combineReducers, applyMiddleware } from 'redux';
import apiMiddleWare from '../middleware/api';
import currentUserReducer from '../reducers/currentUser';

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
});

const store = createStore(rootReducer, applyMiddleware(apiMiddleWare))

export default store;
