const SET_SIGNIN = 'SET_SIGNIN' as const;

export interface User {
  userInfo: {
    id: string;
    username: string;
  };
  isSignin: boolean;
  token: string;
}

const init: User = {
  userInfo: {
    id: '',
    username: '',
  },
  isSignin: false,
  token: '',
};

interface SetSigninAction {
  type: typeof SET_SIGNIN;
  data: { id: string; username: string };
  state: boolean;
  token: string;
}

export const signinReducer = (state = init, action: SetSigninAction): User => {
  switch (action.type) {
    case SET_SIGNIN:
      return {
        ...state,
        userInfo: action.data,
        isSignin: action.state,
        token: action.token,
      };

    default:
      return state;
  }
};

export const setSignin = (
  data: { id: string; username: string },
  state: boolean,
  token: string,
): SetSigninAction => ({
  type: SET_SIGNIN,
  data,
  state,
  token,
});

export type SigninAction = ReturnType<typeof setSignin>;
