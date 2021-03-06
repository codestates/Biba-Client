const SET_LOGINSTATE = 'SET_LOGINSTATE' as const;
const SET_LOGOUTSTATE = 'SET_LOGOUTSTATE' as const;
const SET_PROFILE = 'SET_PROFILE' as const;
const SET_MYREVIEWS = 'SET_MYREVIEWS' as const;
const CHANGE_PROFILE = 'CHANGE_PROFILE' as const;
const DELETE_PROFILE = 'DELETE_PROFILE' as const;
const CHANGE_NICKNAME = 'CHANGE_NICKNAME' as const;
const CONFIRM_EMAIL = 'CONFIRM_EMAIL' as const;
const CONFIRM_NICKNAME = 'CONFIRM_NICKNAME' as const;
const CONFIRM_AGE = 'CONFIRM_AGE' as const;
const REF_DISPLAY = 'REF_DISPLAY' as const;

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
export interface MyReview {
  nickname: string;
  id: number;
  beer_name: string;
  beer_img: string;
  comment: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
}
export interface MyReviewList {
  myReviews: MyReview[];
}
export interface ConfirmInput {
  value: boolean;
}
export interface RefDisplay {
  display: boolean;
}

// 이하로 action interface + init + action
export interface UserStateAction extends UserState {
  type: typeof SET_LOGINSTATE | typeof SET_LOGOUTSTATE | typeof CHANGE_NICKNAME;
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
export const changeNickname = (
  userData: User,
  isLogin: boolean,
  token: string,
): UserStateAction => ({
  type: CHANGE_NICKNAME,
  userData,
  isLogin,
  token,
});

export interface ProfileAction extends UserProfile {
  type: typeof SET_PROFILE | typeof CHANGE_PROFILE | typeof DELETE_PROFILE;
}
const profileInit: UserProfile = {
  profile:
    'https://user-images.githubusercontent.com/65945933/97770213-abf44200-1b74-11eb-8fff-2ce30b4c443b.jpg',
  // 'https://user-images.githubusercontent.com/65945933/97770233-b6aed700-1b74-11eb-9a42-e0a18f11bf8d.jpg',
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

export interface MyReviewListAction extends MyReviewList {
  type: typeof SET_MYREVIEWS;
}
const myReviewsInit: MyReviewList = {
  myReviews: [],
};
export const setMyReviews = (myReviews: MyReview[]): MyReviewListAction => ({
  type: SET_MYREVIEWS,
  myReviews,
});

export interface ConfirmInputAction extends ConfirmInput {
  type: typeof CONFIRM_EMAIL | typeof CONFIRM_NICKNAME | typeof CONFIRM_AGE;
}
const emailInputInit: ConfirmInput = {
  value: false,
};
const nicknameInputInit: ConfirmInput = {
  value: false,
};
const ageInputInit: ConfirmInput = {
  value: false,
};
export const checkEmailInput = (value: boolean): ConfirmInputAction => ({
  type: CONFIRM_EMAIL,
  value,
});
export const checkNicknameInput = (value: boolean): ConfirmInputAction => ({
  type: CONFIRM_NICKNAME,
  value,
});
export const checkAgeInput = (value: boolean): ConfirmInputAction => ({
  type: CONFIRM_AGE,
  value,
});

export interface RefDisplayAction extends RefDisplay {
  type: typeof REF_DISPLAY;
}
const refDisplayInit: RefDisplay = {
  display: false,
};
export const setRefDisplay = (display: boolean): RefDisplayAction => ({
  type: REF_DISPLAY,
  display,
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

    case CHANGE_NICKNAME:
      return {
        ...state,
        userData: action.userData,
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
        profile: '',
      };

    default:
      return state;
  }
};

export const myReviewsReducer = (
  state = myReviewsInit,
  action: MyReviewListAction,
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

export const confirmEmailReducer = (
  state = emailInputInit,
  action: ConfirmInputAction,
): ConfirmInput => {
  switch (action.type) {
    case CONFIRM_EMAIL:
      return {
        ...state,
        value: action.value,
      };

    default:
      return state;
  }
};

export const confirmNicknameReducer = (
  state = nicknameInputInit,
  action: ConfirmInputAction,
): ConfirmInput => {
  switch (action.type) {
    case CONFIRM_NICKNAME:
      return {
        ...state,
        value: action.value,
      };

    default:
      return state;
  }
};

export const confirmAgeReducer = (
  state = ageInputInit,
  action: ConfirmInputAction,
): ConfirmInput => {
  switch (action.type) {
    case CONFIRM_AGE:
      return {
        ...state,
        value: action.value,
      };

    default:
      return state;
  }
};

export const refDisplayReducer = (
  state = refDisplayInit,
  action: RefDisplayAction,
): RefDisplay => {
  switch (action.type) {
    case REF_DISPLAY:
      return {
        ...state,
        display: action.display,
      };

    default:
      return state;
  }
};
