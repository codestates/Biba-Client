const SET_BEERDETAIL = 'SET_BEERDETAIL' as const;
const SET_ALLREVIEWS = 'SET_ALLREVIEWS' as const;
const SET_BOOKMARK = 'SET_BOOKMARK' as const;
const SET_USERREVIEW = 'SET_USERREVIEW' as const;
const SET_INFOSTATUS = 'SET_INFOSTATUS' as const;
const SET_STARSTATUS = 'SET_STARSTATUS' as const;

export interface Bookmark {
  bookmark: boolean;
}
export interface UserReview {
  user_review: boolean;
  user_star: boolean;
  user_input: string;
  user_rate: number;
}
export interface IBeerDetail {
  id: number;
  beer_name: string;
  beer_img: string;
  abv: number;
  ibu: number;
  company: string;
  country: string;
  style_name: string;
  rate: number;
}
export interface ObjBeerDetail {
  beerDetail: IBeerDetail;
}

export interface aReview {
  message: string;
}
export interface AllReviewList {
  allReviews: aReview[];
}

export interface InfoStatus {
  story: boolean;
  more: boolean;
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
    beer_img: 'default img',
    abv: -1,
    ibu: -1,
    company: '',
    country: '',
    style_name: '',
    rate: -1,
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

export interface UserReviewAction extends UserReview {
  type: typeof SET_USERREVIEW;
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

export interface InfoStatusAction extends InfoStatus {
  type: typeof SET_INFOSTATUS;
}
const infoStatusInit: InfoStatus = {
  story: true,
  more: false,
};
export const setInfoStatus = (
  story: boolean,
  more: boolean,
): InfoStatusAction => ({
  type: SET_INFOSTATUS,
  story,
  more,
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

export const infoStatusReducer = (
  state = infoStatusInit,
  action: InfoStatusAction,
): InfoStatus => {
  switch (action.type) {
    case SET_INFOSTATUS:
      return {
        ...state,
        story: action.story,
        more: action.more,
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
