import { SET_SIGNIN } from '../actions';
import { SetSigninAction } from '../actions';

export interface User {
  userInfo: {
    id: string;
    username: string;
  };
  isLogin: boolean;
  token: string;
}

const init: User = {
  userInfo: {
    id: '',
    username: '',
  },
  isLogin: false,
  token: '',
};

export const signinReducer = (state = init, action: SetSigninAction): User => {
  switch (action.type) {
    case SET_SIGNIN:
      return { ...state, isLogin: action.state, token: action.token };

    default:
      return state;
  }
};
