const SET_SEARCHBAR = 'SET_SEARCHBAR' as const;
const SET_MODAL = 'SET_MODAL' as const;
const SET_BTNCOLOR = 'SET_BTNCOLOR' as const;

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
export interface BtnColor {
  btn: string;
  text: string;
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

export interface BtnColorAction extends BtnColor {
  type: typeof SET_BTNCOLOR;
}
const btnInit: BtnColor = {
  btn: 'grey',
  text: 'black',
};
export const setBtnColor = (btn: string, text: string): BtnColorAction => ({
  type: SET_BTNCOLOR,
  btn,
  text,
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

export const btnColorReducer = (
  state = btnInit,
  action: BtnColorAction,
): BtnColor => {
  switch (action.type) {
    case SET_BTNCOLOR:
      return {
        ...state,
        btn: action.btn,
        text: action.text,
      };

    default:
      return state;
  }
};
