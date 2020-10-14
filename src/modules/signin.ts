const SET_SIGNIN = 'SET_SIGNIN' as const;

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

interface SetSigninAction {
  type: typeof SET_SIGNIN;
  state: boolean;
  token: string;
}

export const signinReducer = (state = init, action: SetSigninAction): User => {
  switch (action.type) {
    case SET_SIGNIN:
      return { ...state, isLogin: action.state, token: action.token };

    default:
      return state;
  }
};

export const setSignin = (state: boolean, token: string): SetSigninAction => ({
  type: SET_SIGNIN,
  state,
  token,
});
