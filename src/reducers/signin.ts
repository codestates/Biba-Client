import { SET_SIGNIN } from '../actions';
import { SetSignInAction } from '../actions';

export interface User {
  userInfo: {
    id: string;
    username: string;
  };
  isLogin: boolean;
}

export const init: User = {
  userInfo: {
    id: '',
    username: '',
  },
  isLogin: false,
};

export const signinReducer = (state = init, action: SetSignInAction): User => {
  switch (action.type) {
    case SET_SIGNIN:
      return { ...state, isLogin: action.boolean };

    default:
      return state;
  }
};
