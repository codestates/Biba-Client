const SET_LOGINSTATE = 'SET_LOGINSTATE' as const;
const SET_LOGOUTSTATE = 'SET_LOGOUTSTATE' as const;
const SET_PROFILE = 'SET_PROFILE' as const;
const SET_MYREVIEWS = 'SET_MYREVIEWS' as const;
const CHANGE_PROFILE = 'CHANGE_PROFILE' as const;
const DELETE_PROFILE = 'DELETE_PROFILE' as const;
const CHANGE_NICKNAME = 'CHANGE_NICKNAME' as const;
const CHANGE_PASSWORD = 'CHANGE_PASSWORD' as const;

export interface User {
  id: number;
  nickname: string;
  email: string;
}
export interface UserProfile {
  profile: string;
}
export interface UserState {
  // 로그인 직후 nav 등에서 받는 기본 정보
  userData: User;
  isLogin: boolean;
  token: string;
}
export interface aReview {
  message: string;
}
export interface MyReviewList {
  myReviews: aReview[];
}

// 이하로 action interface + init + action
export interface UserStateAction extends UserState {
  type: typeof SET_LOGINSTATE | typeof SET_LOGOUTSTATE;
}
const loginInit: UserState = {
  userData: {
    id: 0,
    nickname: '',
    email: '',
  },
  isLogin: false,
  token: '',
};
export const setLogin = (
  userData: User,
  isLogin: boolean,
  token: string,
): UserStateAction => ({
  type: SET_LOGINSTATE,
  userData,
  isLogin,
  token,
});
export const setLogout = (
  userData: User,
  isLogin: boolean,
  token: string,
): UserStateAction => ({
  type: SET_LOGOUTSTATE,
  userData,
  isLogin,
  token,
});

export interface ProfileAction extends UserProfile {
  type: typeof SET_PROFILE | typeof CHANGE_PROFILE | typeof DELETE_PROFILE;
}
const profileInit: UserProfile = {
  profile: 'empty',
};
export const setProfile = (profile: string): ProfileAction => ({
  // login 했을 때 프로필 사진 받아서 저장하기
  type: SET_PROFILE,
  profile,
});
export const changeProfile = (profile: string): ProfileAction => ({
  type: CHANGE_PROFILE,
  profile,
});
export const deleteProfile = (profile: string): ProfileAction => ({
  // profile === default로 변환(삭제)
  type: DELETE_PROFILE,
  profile,
});

export interface ReviewListAction extends MyReviewList {
  type: typeof SET_MYREVIEWS;
}
const myReviewsInit: MyReviewList = {
  myReviews: [],
};
export const setMyReviews = (myReviews: aReview[]): ReviewListAction => ({
  type: SET_MYREVIEWS,
  myReviews,
});

// ============ 이하로 reducers
export const loginReducer = (
  state = loginInit,
  action: UserStateAction,
): UserState => {
  switch (action.type) {
    case SET_LOGINSTATE:
      return {
        ...state,
        userData: action.userData,
        isLogin: action.isLogin,
        token: action.token,
      };

    case SET_LOGOUTSTATE:
      return {
        ...state,
        ...loginInit,
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

    case DELETE_PROFILE:
      return {
        ...state,
        profile: 'empty',
      };

    default:
      return state;
  }
};

export const myReviewsReducer = (
  state = myReviewsInit,
  action: ReviewListAction,
): MyReviewList => {
  switch (action.type) {
    case SET_MYREVIEWS:
      return {
        ...state,
        myReviews: action.myReviews,
      };

    default:
      return state;
  }
};

// export type LoginAction = ReturnType<typeof setLogin>;
