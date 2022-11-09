import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({ userReducer, playerReducer });

export default rootReducer;
