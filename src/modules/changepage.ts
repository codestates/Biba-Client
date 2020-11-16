import { FaAssistiveListeningSystems } from 'react-icons/fa';

export const TODAY_BEER = 'TODAY_BEER';
export const WANTSOME_BEER = 'WANTSOME_BEER';
export const FAVORITE = 'FAVORITE';
export const REVIEW = 'REVIEW';
export const SEARCH_BEER = 'SEARCH_BEER';
export const MYPAGE = 'MYPAGE';
export const MOBILE_SEARCH = 'MOBILE_SEARCH';
export const MOBILE_MYBEER = 'MOBILE_MYBEER';

export interface TodayBeer {
  type: typeof TODAY_BEER;
}

export interface WantsomeBeer {
  type: typeof WANTSOME_BEER;
}

export interface Favorite {
  type: typeof FAVORITE;
}

export interface Review {
  type: typeof REVIEW;
}

export interface SearchBeer {
  type: typeof SEARCH_BEER;
}

export interface MyPage {
  type: typeof MYPAGE;
}

export interface MobileSearch {
  type: typeof MOBILE_SEARCH;
}
export interface MobileMybeer {
  type: typeof MOBILE_MYBEER;
}

export type BeerListNavDispatchTypes =
  | TodayBeer
  | WantsomeBeer
  | Favorite
  | Review
  | SearchBeer
  | MyPage
  | MobileSearch
  | MobileMybeer;

export interface PageStateI {
  isToday: boolean;
  isWant: boolean;
  isFavorite: boolean;
  isReview: boolean;
  isSearch: boolean;
  isMy: boolean;
  isSearchM: boolean;
  isMybeerM: boolean;
}

const defaultPage: PageStateI = {
  isToday: true,
  isWant: false,
  isFavorite: false,
  isReview: false,
  isSearch: false,
  isMy: false,
  isSearchM: false,
  isMybeerM: false,
};

export const changeTodayBeerAction = (): TodayBeer => {
  return {
    type: TODAY_BEER,
  };
};

export const changeWantsomeBeerAction = (): WantsomeBeer => {
  return {
    type: WANTSOME_BEER,
  };
};

export const changeFavoriteAction = (): Favorite => {
  return {
    type: FAVORITE,
  };
};

export const changeReviewAction = (): Review => {
  return {
    type: REVIEW,
  };
};

export const changeSearchBeerAction = (): SearchBeer => {
  return {
    type: SEARCH_BEER,
  };
};

export const changeMyPageAction = (): MyPage => {
  return {
    type: MYPAGE,
  };
};

export const changeMobileSearchAction = (): MobileSearch => {
  return {
    type: MOBILE_SEARCH,
  };
};

export const changeMobileMyBeerAction = (): MobileMybeer => {
  return {
    type: MOBILE_MYBEER,
  };
};

export const changePageReducer = (
  state: PageStateI = defaultPage,
  action: BeerListNavDispatchTypes,
): PageStateI => {
  switch (action.type) {
    case TODAY_BEER:
      return {
        isToday: true,
        isWant: false,
        isFavorite: false,
        isReview: false,
        isSearch: false,
        isMy: false,
        isSearchM: false,
        isMybeerM: false,
      };
    case WANTSOME_BEER:
      return {
        isToday: false,
        isWant: true,
        isFavorite: false,
        isReview: false,
        isSearch: false,
        isMy: false,
        isSearchM: false,
        isMybeerM: false,
      };
    case FAVORITE:
      return {
        isToday: false,
        isWant: false,
        isFavorite: true,
        isReview: false,
        isSearch: false,
        isMy: false,
        isSearchM: false,
        isMybeerM: false,
      };
    case REVIEW:
      return {
        isToday: false,
        isWant: false,
        isFavorite: false,
        isReview: true,
        isSearch: false,
        isMy: false,
        isSearchM: false,
        isMybeerM: false,
      };
    case SEARCH_BEER:
      return {
        isToday: false,
        isWant: false,
        isFavorite: false,
        isReview: false,
        isSearch: true,
        isMy: false,
        isSearchM: false,
        isMybeerM: false,
      };
    case MYPAGE:
      return {
        isToday: false,
        isWant: false,
        isFavorite: false,
        isReview: false,
        isSearch: false,
        isMy: true,
        isSearchM: false,
        isMybeerM: false,
      };
    case MOBILE_SEARCH:
      return {
        isToday: false,
        isWant: false,
        isFavorite: false,
        isReview: false,
        isSearch: false,
        isMy: false,
        isSearchM: true,
        isMybeerM: false,
      };
    case MOBILE_MYBEER:
      return {
        isToday: false,
        isWant: false,
        isFavorite: false,
        isReview: false,
        isSearch: false,
        isMy: false,
        isSearchM: false,
        isMybeerM: true,
      };
    default:
      return state;
  }
};
