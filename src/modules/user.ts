const SET_LOGIN = 'SET_LOGIN' as const;

export interface UserState {
  userData: {
    id: number;
    username: string;
  };
  isLogin: boolean;
  token: string;
}

const init: UserState = {
  userData: {
    id: 0,
    username: '',
  },
  isLogin: false,
  token: '',
};

export interface SetLoginAction {
  type: typeof SET_LOGIN;
  userData: { id: number; username: string };
  isLogin: boolean;
  token: string;
}

export const loginReducer = (
  state = init,
  action: SetLoginAction,
): UserState => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        userData: action.userData,
        isLogin: action.isLogin,
        token: action.token,
      };

    default:
      return state;
  }
};

export const setLogin = (
  userData: { id: number; username: string },
  isLogin: boolean,
  token: string,
): SetLoginAction => ({
  type: SET_LOGIN,
  userData,
  isLogin,
  token,
});

export type LoginAction = ReturnType<typeof setLogin>;
