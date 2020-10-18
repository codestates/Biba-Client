const SET_SEARCHBAR = 'SET_SEARCHBAR' as const;
const SET_MODAL = 'SET_MODAL' as const;

export interface ModalContent {
  contentType: ContentType;
}
export interface ModalState extends ModalContent {
  display: boolean;
}
export enum ContentType {
  Empty,
  Login,
  MypageAllReviews,
  ChangeNickname,
}

// 이하로 action interface + init + action
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

// ============ 이하로 reducers
export const modalReducer = (
  state = modalInit,
  action: ModalStateAction,
): ModalState => {
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
