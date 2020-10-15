const SET_SIGNIN = 'SET_SIGNIN' as const;

export interface UserState {
  userData: {
    id: number;
    username: string;
  };
  isSignin: boolean;
  token: string;
}

const init: UserState = {
  userData: {
    id: 0,
    username: '',
  },
  isSignin: false,
  token: '',
};

interface SetSigninAction {
  type: typeof SET_SIGNIN;
  data: { id: number; username: string };
  state: boolean;
  token: string;
}

export const signinReducer = (
  state = init,
  action: SetSigninAction,
): UserState => {
  switch (action.type) {
    case SET_SIGNIN:
      return {
        ...state,
        userData: action.data,
        isSignin: action.state,
        token: action.token,
      };

    default:
      return state;
  }
};

export const setSignin = (
  data: { id: number; username: string },
  state: boolean,
  token: string,
): SetSigninAction => ({
  type: SET_SIGNIN,
  data,
  state,
  token,
});

export type SigninAction = ReturnType<typeof setSignin>;
