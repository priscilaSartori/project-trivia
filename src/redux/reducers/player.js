import { GET_LOGIN, ADD_SCORE, ADD_ASSERTIONS, CLEAR_STATE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ADD_ASSERTIONS:
    console.log(action.payload);
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  case CLEAR_STATE:
    return {
      ...state,
      assertions: 0,
      store: 0,
    };
  default:
    return state;
  }
};

export default player;
