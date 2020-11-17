const PRESS_SEARCHBTN = 'PRESS_SEARCHBTN' as const;
const SET_SEARCHPAGEINFO = 'SET_SEARCHPAGEINFO' as const;

interface SearchBtnState {
  activate: boolean;
}
interface RecommendBeer {
  id: number;
  beer_name: string;
  beer_img: string;
  rate: number;
}
export interface SearchPageInfo {
  recommend: RecommendBeer[];
  tags: string[];
}

interface SearchBtnStateAction extends SearchBtnState {
  type: typeof PRESS_SEARCHBTN;
}
const searchBtnInit: SearchBtnState = {
  activate: false,
};
export const pressSearchBtn = (activate: boolean): SearchBtnStateAction => ({
  type: PRESS_SEARCHBTN,
  activate,
});

interface SearchPageInfoAction extends SearchPageInfo {
  type: typeof SET_SEARCHPAGEINFO;
}
const searchPageInfoInit: SearchPageInfo = {
  recommend: [],
  tags: [],
};
export const setSearchPageInfo = ({
  recommend,
  tags,
}: SearchPageInfo): SearchPageInfoAction => ({
  type: SET_SEARCHPAGEINFO,
  recommend,
  tags,
});

export const searchBtnReducer = (
  state = searchBtnInit,
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
export const searchPageInfoReducer = (
  state = searchPageInfoInit,
  action: SearchPageInfoAction,
): SearchPageInfo => {
  switch (action.type) {
    case SET_SEARCHPAGEINFO:
      return {
        ...state,
        recommend: action.recommend,
        tags: action.tags,
      };

    default:
      return state;
  }
};
