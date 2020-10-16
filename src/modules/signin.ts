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

export interface SetSigninAction {
  type: typeof SET_SIGNIN;
  userData: { id: number; username: string };
  isSignin: boolean;
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
        userData: action.userData,
        isSignin: action.isSignin,
        token: action.token,
      };

    default:
      return state;
  }
};

export const setSignin = (
  userData: { id: number; username: string },
  isSignin: boolean,
  token: string,
): SetSigninAction => ({
  type: SET_SIGNIN,
  userData,
  isSignin,
  token,
});

export type SigninAction = ReturnType<typeof setSignin>;
