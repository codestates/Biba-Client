const PRESS_SEARCHBTN = 'PRESS_SEARCHBTN' as const;

interface SearchBtnState {
  activate: boolean;
}

interface SearchBtnStateAction extends SearchBtnState {
  type: typeof PRESS_SEARCHBTN;
}
const SearchBtnInit: SearchBtnState = {
  activate: false,
};
export const pressSearchBtn = (activate: boolean): SearchBtnStateAction => ({
  type: PRESS_SEARCHBTN,
  activate,
});

export const searchBtnReducer = (
  state = SearchBtnInit,
  action: SearchBtnStateAction,
): SearchBtnState => {
  switch (action.type) {
    case PRESS_SEARCHBTN:
      return {
        ...state,
        activate: action.activate,
      };

    default:
      return state;
  }
};
