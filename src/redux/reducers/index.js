import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ userReducer, playerReducer, tokenReducer });

export default rootReducer;
