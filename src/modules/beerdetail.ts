const SET_BEERDETAIL = 'SET_BEERDETAIL' as const;
const SET_BOOKMARK = 'SET_BOOKMARK' as const;
const SET_GRAPHDATA = 'SET_GRAPHDATA' as const;
const SET_USERREVIEW = 'SET_USERREVIEW' as const;
const DELETE_USERREVIEW = 'DELETE_USERREVIEW' as const;
const SET_ALLREVIEWS = 'SET_ALLREVIEWS' as const;
const SET_INFODISPLAY = 'SET_INFODISPLAY' as const;
const SET_INFOSTATUS = 'SET_INFOSTATUS' as const;
const SET_STARSTATUS = 'SET_STARSTATUS' as const;

export interface IBeerDetail {
  id: number;
  beer_name: string;
  beer_img: string;
  abv: number;
  ibu: number;
  company: string;
  country: string;
  style_name: string;
  story: string;
  explain: string;
  source: string;
  rate: number;
  tags: string[];
}
export interface ObjBeerDetail {
  beerDetail: IBeerDetail;
}
export interface Bookmark {
  bookmark: boolean;
}
export interface GraphData {
  sparkling: number;
  sweet: number;
  bitter: number;
  accessibility: number;
  body: number;
}
export interface UserReview {
  user_review: boolean;
  user_star: boolean;
  user_input: string;
  user_rate: number;
}
export interface aReview {
  id: number;
  comment: string;
  rate: number;
  beer_id: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  nickname: string;
  profile: string;
}
export interface AllReviewList {
  allReviews: aReview[];
}

export interface InfoDisplay {
  disBasic: boolean;
  disStory: boolean;
  disMore: boolean;
}
export interface InfoStatus {
  tabBasic: boolean;
  tabStory: boolean;
  tabMore: boolean;
}
export interface StarStatus {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
}

export // 이하로 action interface + init + action
interface BeerDetailAction extends ObjBeerDetail {
  type: typeof SET_BEERDETAIL;
}
export const beerDetailInit: ObjBeerDetail = {
  beerDetail: {
    id: -1,
    beer_name: '',
    beer_img: '',
    abv: -1,
    ibu: -1,
    company: '',
    country: '',
    style_name: '',
    story: '',
    explain: '',
    source: '',
    rate: -1,
    tags: [],
  },
};
export const setBeerDetail = (beerDetail: IBeerDetail): BeerDetailAction => ({
  type: SET_BEERDETAIL,
  beerDetail,
});

export interface BookmarkAction extends Bookmark {
  type: typeof SET_BOOKMARK;
}
const bookmarkInit: Bookmark = {
  bookmark: false,
};
export const setBookmark = (bookmark: boolean): BookmarkAction => ({
  type: SET_BOOKMARK,
  bookmark,
});

export interface GraphDataAction extends GraphData {
  type: typeof SET_GRAPHDATA;
}
const graphDataInit: GraphData = {
  sparkling: 0,
  sweet: 0,
  bitter: 0,
  accessibility: 0,
  body: 0,
};
export const setGraphData = (
  sparkling: number,
  sweet: number,
  bitter: number,
  accessibility: number,
  body: number,
): GraphDataAction => ({
  type: SET_GRAPHDATA,
  sparkling,
  sweet,
  bitter,
  accessibility,
  body,
});

export interface UserReviewAction extends UserReview {
  type: typeof SET_USERREVIEW | typeof DELETE_USERREVIEW;
}
const userReviewInit: UserReview = {
  user_review: false,
  user_star: false,
  user_input: '',
  user_rate: -1,
};
export const setUserReview = (
  user_review: boolean,
  user_star: boolean,
  user_input: string,
  user_rate: number,
): UserReviewAction => ({
  type: SET_USERREVIEW,
  user_review,
  user_star,
  user_input,
  user_rate,
});

export interface AllReviewListAction extends AllReviewList {
  type: typeof SET_ALLREVIEWS;
}
const allReviewsInit: AllReviewList = {
  allReviews: [],
};
export const setMyReviews = (allReviews: aReview[]): AllReviewListAction => ({
  type: SET_ALLREVIEWS,
  allReviews,
});

export interface InfoDisplayAction extends InfoDisplay {
  type: typeof SET_INFODISPLAY;
}
const infoDisplayInit: InfoDisplay = {
  disBasic: true,
  disStory: true,
  disMore: true,
};
export const setInfoDisplay = (
  disBasic: boolean,
  disStory: boolean,
  disMore: boolean,
): InfoDisplayAction => ({
  type: SET_INFODISPLAY,
  disBasic,
  disStory,
  disMore,
});

export interface InfoStatusAction extends InfoStatus {
  type: typeof SET_INFOSTATUS;
}
const infoStatusInit: InfoStatus = {
  tabBasic: true,
  tabStory: false,
  tabMore: false,
};
export const setInfoStatus = (
  tabBasic: boolean,
  tabStory: boolean,
  tabMore: boolean,
): InfoStatusAction => ({
  type: SET_INFOSTATUS,
  tabBasic,
  tabStory,
  tabMore,
});

interface StarStatusAction extends StarStatus {
  type: typeof SET_STARSTATUS;
}
export const starStatusInit: StarStatus = {
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
};
export const setStarStatus = (
  a: boolean,
  b: boolean,
  c: boolean,
  d: boolean,
  e: boolean,
): StarStatusAction => ({
  type: SET_STARSTATUS,
  a,
  b,
  c,
  d,
  e,
});

// ============ 이하로 reducers
export const beerDetailReducer = (
  state = beerDetailInit,
  action: BeerDetailAction,
): ObjBeerDetail => {
  switch (action.type) {
    case SET_BEERDETAIL:
      return {
        ...state,
        beerDetail: action.beerDetail,
      };

    default:
      return state;
  }
};

export const bookmarkReducer = (
  state = bookmarkInit,
  action: BookmarkAction,
): Bookmark => {
  switch (action.type) {
    case SET_BOOKMARK:
      return {
        ...state,
        bookmark: action.bookmark,
      };

    default:
      return state;
  }
};
export const graphDataReducer = (
  state = graphDataInit,
  action: GraphDataAction,
): GraphData => {
  switch (action.type) {
    case SET_GRAPHDATA:
      return {
        ...state,
        sparkling: action.sparkling,
        sweet: action.sweet,
        bitter: action.bitter,
        accessibility: action.accessibility,
        body: action.body,
      };

    default:
      return state;
  }
};

export const userReviewReducer = (
  state = userReviewInit,
  action: UserReviewAction,
): UserReview => {
  switch (action.type) {
    case SET_USERREVIEW:
      return {
        ...state,
        user_review: action.user_review,
        user_star: action.user_star,
        user_input: action.user_input,
        user_rate: action.user_rate,
      };

    case DELETE_USERREVIEW:
      return {
        ...state,
        ...userReviewInit,
      };

    default:
      return state;
  }
};
export const allReviewsReducer = (
  state = allReviewsInit,
  action: AllReviewListAction,
): AllReviewList => {
  switch (action.type) {
    case SET_ALLREVIEWS:
      return {
        ...state,
        allReviews: action.allReviews,
      };

    default:
      return state;
  }
};

export const infoDisplayReducer = (
  state = infoDisplayInit,
  action: InfoDisplayAction,
): InfoDisplay => {
  switch (action.type) {
    case SET_INFODISPLAY:
      return {
        ...state,
        disBasic: action.disBasic,
        disStory: action.disStory,
        disMore: action.disMore,
      };

    default:
      return state;
  }
};

export const infoStatusReducer = (
  state = infoStatusInit,
  action: InfoStatusAction,
): InfoStatus => {
  switch (action.type) {
    case SET_INFOSTATUS:
      return {
        ...state,
        tabBasic: action.tabBasic,
        tabStory: action.tabStory,
        tabMore: action.tabMore,
      };

    default:
      return state;
  }
};

export const starStatusReducer = (
  state = starStatusInit,
  action: StarStatusAction,
): StarStatus => {
  switch (action.type) {
    case SET_STARSTATUS:
      return {
        ...state,
        a: action.a,
        b: action.b,
        c: action.c,
        d: action.d,
        e: action.e,
      };

    default:
      return state;
  }
};
