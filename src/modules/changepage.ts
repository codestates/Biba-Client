export const TODAY_BEER = 'TODAY_BEER';
export const WANTSOME_BEER = 'WANTSOME_BEER';
export const MY_BEER = 'MY_BEER';

export interface TodayBeer {
  type: typeof TODAY_BEER;
}

export interface WantsomeBeer {
  type: typeof WANTSOME_BEER;
}

export interface MyBeer {
  type: typeof MY_BEER;
}

export type BeerListNavDispatchTypes = TodayBeer | WantsomeBeer | MyBeer;

export interface PageStateI {
  isToday: boolean;
  isWant: boolean;
  isMy: boolean;
}

const defaultPage: PageStateI = {
  isToday: true,
  isWant: false,
  isMy: false,
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
      };
    case WANTSOME_BEER:
      return {
        isToday: false,
        isWant: true,
        isMy: false,
      };
    case MY_BEER:
      return {
        isToday: false,
        isWant: false,
        isMy: true,
      };
    default:
      return state;
  }
};
