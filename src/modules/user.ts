const SET_LOGINSTATE = 'SET_LOGINSTATE' as const;
const SET_LOGOUT = 'SET_LOGOUT' as const;
const SET_PROFILE = 'SET_PROFILE' as const;
const CHANGE_USERNAME = 'CHANGE_USERNAME' as const;
const CHANGE_PASSWORD = 'CHANGE_PASSWORD' as const;
const CHANGE_PROFILE = 'CHANGE_PROFILE' as const;

interface User {
  id: number;
  username: string;
}

export interface UserState {
  // 로그인 직후 nav 등에서 받는 기본 정보
  userData: User;
  isLogin: boolean;
  token: string;
}

export interface UserProfile {
  profile: string;
}

export interface UserDetail extends User, UserProfile {
  // mypage에 뿌려지는 정보 전체, 로그인 시 dispatch 여부 결정
  email: string;
}

// 이하로 action interface + init + action
export interface StateAction extends UserState {
  type: typeof SET_LOGINSTATE;
}
const loginInit: UserState = {
  userData: {
    id: 0,
    username: '',
  },
  isLogin: false,
  token: '',
};
export const setLogin = (
  userData: { id: number; username: string },
  isLogin: boolean,
  token: string,
): StateAction => ({
  type: SET_LOGINSTATE,
  userData,
  isLogin,
  token,
});

export interface ProfileAction extends UserProfile {
  type: typeof SET_PROFILE | typeof CHANGE_PROFILE;
}
const profileInit: UserProfile = {
  profile: 'profile image test string',
};
export const setProfile = (profile: string): ProfileAction => ({
  type: SET_PROFILE,
  profile,
});
export const changeProfile = (profile: string): ProfileAction => ({
  type: CHANGE_PROFILE,
  profile,
});

// ============ 이하로 reducers
export const loginReducer = (
  state = loginInit,
  action: StateAction,
): UserState => {
  switch (action.type) {
    case SET_LOGINSTATE:
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

export const profileReducer = (
  state = profileInit,
  action: ProfileAction,
): UserProfile => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case CHANGE_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    default:
      return state;
  }
};

// export type LoginAction = ReturnType<typeof setLogin>;
