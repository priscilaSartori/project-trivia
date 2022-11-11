import { combineReducers } from 'redux';
import userReducer from './userReducer';
import player from './player';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ userReducer, player, tokenReducer });

export default rootReducer;
