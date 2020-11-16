const SET_MODAL = 'SET_MODAL' as const;
const SET_MOBILE_MODAL = 'SET_MOBILE_MODAL' as const;

export enum ContentType {
  Empty,
  Login,
  ChangeNickname,
  MyPageAllRates,
  MyPageAllReviews,
  MyBeerList,
  UsersReview,
  DetailAllReviews,
  RequestBeer,
}

export interface ModalContent {
  contentType: ContentType;
}
export interface ModalState extends ModalContent {
  display: boolean;
}
export interface MobileModalState extends ModalContent {
  display: boolean;
}

interface ModalStateAction extends ModalState {
  type: typeof SET_MODAL;
}
const modalInit: ModalState = {
  contentType: ContentType.Empty,
  display: false,
};
export const setModal = (
  contentType: ContentType,
  display: boolean,
): ModalStateAction => ({
  type: SET_MODAL,
  contentType,
  display,
});

interface MobileModalStateAction extends MobileModalState {
  type: typeof SET_MOBILE_MODAL;
}
const mobileModalInit: MobileModalState = {
  contentType: ContentType.Empty,
  display: false,
};
export const setMobileModal = (
  contentType: ContentType,
  display: boolean,
): MobileModalStateAction => ({
  type: SET_MOBILE_MODAL,
  contentType,
  display,
});

export const modalReducer = (
  state = modalInit,
  action: ModalStateAction,
): MobileModalState => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        contentType: action.contentType,
        display: action.display,
      };

    default:
      return state;
  }
};

export const mobileModalReducer = (
  state = mobileModalInit,
  action: MobileModalStateAction,
): MobileModalState => {
  switch (action.type) {
    case SET_MOBILE_MODAL:
      return {
        ...state,
        contentType: action.contentType,
        display: action.display,
      };

    default:
      return state;
  }
};
