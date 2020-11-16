const SET_MODAL = 'SET_MODAL' as const;
const SET_BOTTOM_MODAL = 'SET_BOTTOM_MODAL' as const;

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
export interface BottomModalState extends ModalContent {
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

interface BottomModalStateAction extends BottomModalState {
  type: typeof SET_BOTTOM_MODAL;
}
const bottomModalInit: BottomModalState = {
  contentType: ContentType.Empty,
  display: false,
};
export const setBottomModal = (
  contentType: ContentType,
  display: boolean,
): BottomModalStateAction => ({
  type: SET_BOTTOM_MODAL,
  contentType,
  display,
});

export const modalReducer = (
  state = modalInit,
  action: ModalStateAction,
): BottomModalState => {
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

export const bottomModalReducer = (
  state = bottomModalInit,
  action: BottomModalStateAction,
): BottomModalState => {
  switch (action.type) {
    case SET_BOTTOM_MODAL:
      return {
        ...state,
        contentType: action.contentType,
        display: action.display,
      };

    default:
      return state;
  }
};
