export const TODAY_BEER = 'TODAY_BEER';
export const WANTSOME_BEER = 'WANTSOME_BEER';
export const FAVORITE = 'FAVORITE';
export const REVIEW = 'REVIEW';
export const SEARCH_BEER = 'SEARCH_BEER';

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

export type BeerListNavDispatchTypes =
  | TodayBeer
  | WantsomeBeer
  | Favorite
  | Review
  | SearchBeer;

export interface PageStateI {
  isToday: boolean;
  isWant: boolean;
  isFavorite: boolean;
  isReview: boolean;
  isSearch: boolean;
}

const defaultPage: PageStateI = {
  isToday: true,
  isWant: false,
  isFavorite: false,
  isReview: false,
  isSearch: false,
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

export const changeSearchBeerrAction = (): SearchBeer => {
  return {
    type: SEARCH_BEER,
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
      };
    case WANTSOME_BEER:
      return {
        isToday: false,
        isWant: true,
        isFavorite: false,
        isReview: false,
        isSearch: false,
      };
    case FAVORITE:
      return {
        isToday: false,
        isWant: false,
        isFavorite: true,
        isReview: false,
        isSearch: false,
      };
    case REVIEW:
      return {
        isToday: false,
        isWant: false,
        isFavorite: false,
        isReview: true,
        isSearch: false,
      };
    case SEARCH_BEER:
      return {
        isToday: false,
        isWant: false,
        isFavorite: false,
        isReview: false,
        isSearch: true,
      };
    default:
      return state;
  }
};
