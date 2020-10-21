export const TODAY_BEER = 'TODAY_BEER';
export const WANTSOME_BEER = 'WANTSOME_BEER';
export const MY_BEER = 'MY_BEER';
export const SEARCH_BEER = 'SEARCH_BEER';

export interface TodayBeer {
  type: typeof TODAY_BEER;
}

export interface WantsomeBeer {
  type: typeof WANTSOME_BEER;
}

export interface MyBeer {
  type: typeof MY_BEER;
}

export interface SearchBeer {
  type: typeof SEARCH_BEER;
}

export type BeerListNavDispatchTypes =
  | TodayBeer
  | WantsomeBeer
  | MyBeer
  | SearchBeer;

export interface PageStateI {
  isToday: boolean;
  isWant: boolean;
  isMy: boolean;
  isSearch: boolean;
}

const defaultPage: PageStateI = {
  isToday: true,
  isWant: false,
  isMy: false,
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

export const changeMyBeerAction = (): MyBeer => {
  return {
    type: MY_BEER,
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
        isMy: false,
        isSearch: false,
      };
    case WANTSOME_BEER:
      return {
        isToday: false,
        isWant: true,
        isMy: false,
        isSearch: false,
      };
    case MY_BEER:
      return {
        isToday: false,
        isWant: false,
        isMy: true,
        isSearch: false,
      };
    case SEARCH_BEER:
      return {
        isToday: false,
        isWant: false,
        isMy: false,
        isSearch: true,
      };
    default:
      return state;
  }
};
