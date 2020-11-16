export const BEER_TODAY = 'today/BEER';
export const BEER_HOT = 'want/BEER_HOT';
export const BEER_LATE = 'want/BEER_LATE';
export const BEER_WHEAT = 'want/BEER_WHEAT';
export const BEER_GERMAN = 'want/BEER_GERMAN';
export const BEER_RECOMMEND = 'want/BEER_RECOMMEND';
export const BEER_FAVORITE_ABC = 'my/BEER_FAVORITE/ABC';
export const BEER_FAVORITE_RECENT = 'my/BEER_FAVORITE/RECENT';
export const BEER_REVIEW = 'my/BEER_REVIEW';

// interface & type & default state
export type BeerT = {
  id: string;
  beer_name: string;
  beer_img: string;
  mobile: string;
  rate: number;
};

export interface BeerProps {
  id: string;
  key: string;
  name: string;
  image: string;
  rate: number;
}

export interface BeerToday {
  type: typeof BEER_TODAY;
  beers: BeerT[];
}

export interface BeerHot {
  type: typeof BEER_HOT;
  beers: Array<BeerT>;
}

export interface BeerLate {
  type: typeof BEER_LATE;
  beers: Array<BeerT>;
}

export interface BeerWheat {
  type: typeof BEER_WHEAT;
  beers: Array<BeerT>;
}

export interface BeerGerman {
  type: typeof BEER_GERMAN;
  beers: Array<BeerT>;
}

export interface BeerRecommend {
  type: typeof BEER_RECOMMEND;
  beers: Array<BeerT>;
}

export interface BeerFavoriteAbc {
  type: typeof BEER_FAVORITE_ABC;
  beers: Array<BeerT>;
}

export interface BeerFavoriteRecent {
  type: typeof BEER_FAVORITE_RECENT;
  beers: Array<BeerT>;
}

export interface BeerReview {
  type: typeof BEER_REVIEW;
  beers: Array<BeerT>;
}

export type BeerDispatchTypes =
  | BeerToday
  | BeerHot
  | BeerLate
  | BeerWheat
  | BeerGerman
  | BeerRecommend
  | BeerFavoriteAbc
  | BeerFavoriteRecent
  | BeerReview;

export interface BeerI {
  beers: BeerT[];
}

const defaultBeer: BeerI = {
  beers: [],
};

export interface WantI {
  hotBeers: BeerT[];
  lateBeers: BeerT[];
  wheatBeers: BeerT[];
  germanBeers: BeerT[];
  recommendBeers: BeerT[];
}

const defaultWant: WantI = {
  hotBeers: [],
  lateBeers: [],
  wheatBeers: [],
  germanBeers: [],
  recommendBeers: [],
};

export interface FavorI {
  abcBeers: BeerT[];
  recentBeers: BeerT[];
}

const defaultFavor: FavorI = {
  abcBeers: [],
  recentBeers: [],
};

//action creators
export const todayBeerAction = (beers: BeerT[]): BeerToday => {
  return {
    type: BEER_TODAY,
    beers,
  };
};

export const hotBeerAction = (beers: BeerT[]): BeerHot => {
  return {
    type: BEER_HOT,
    beers,
  };
};
export const lateBeerAction = (beers: BeerT[]): BeerLate => {
  return {
    type: BEER_LATE,
    beers,
  };
};

export const wheatBeerAction = (beers: BeerT[]): BeerWheat => {
  return {
    type: BEER_WHEAT,
    beers,
  };
};

export const germanBeerAction = (beers: BeerT[]): BeerGerman => {
  return {
    type: BEER_GERMAN,
    beers,
  };
};

export const recommendBeerAction = (beers: BeerT[]): BeerRecommend => {
  return {
    type: BEER_RECOMMEND,
    beers,
  };
};

export const favoriteBeerAbcAction = (beers: BeerT[]): BeerFavoriteAbc => {
  return {
    type: BEER_FAVORITE_ABC,
    beers,
  };
};

export const favoriteBeerRecentAction = (
  beers: BeerT[],
): BeerFavoriteRecent => {
  return {
    type: BEER_FAVORITE_RECENT,
    beers,
  };
};

export const reviewBeerAction = (beers: BeerT[]): BeerReview => {
  return {
    type: BEER_REVIEW,
    beers,
  };
};

//reducers
export const todayBeerReducer = (
  state: BeerI = defaultBeer,
  action: BeerDispatchTypes,
): BeerI => {
  switch (action.type) {
    case BEER_TODAY:
      return {
        ...state,
        beers: action.beers,
      };
    default:
      return state;
  }
};

export const wantBeerReducer = (
  state: WantI = defaultWant,
  action: BeerDispatchTypes,
): WantI => {
  switch (action.type) {
    case BEER_HOT:
      return {
        ...state,
        hotBeers: action.beers,
      };
    case BEER_LATE:
      return {
        ...state,
        lateBeers: action.beers,
      };
    case BEER_WHEAT:
      return {
        ...state,
        wheatBeers: action.beers,
      };
    case BEER_GERMAN:
      return {
        ...state,
        germanBeers: action.beers,
      };
    case BEER_RECOMMEND:
      return {
        ...state,
        recommendBeers: action.beers,
      };
    default:
      return state;
  }
};

export const favoriteBeerReducer = (
  state: FavorI = defaultFavor,
  action: BeerDispatchTypes,
): FavorI => {
  switch (action.type) {
    case BEER_FAVORITE_ABC:
      return {
        ...state,
        abcBeers: action.beers,
      };
    case BEER_FAVORITE_RECENT:
      return {
        ...state,
        recentBeers: action.beers,
      };
    default:
      return state;
  }
};

export const reviewBeerReducer = (
  state: BeerI = defaultBeer,
  action: BeerDispatchTypes,
): BeerI => {
  switch (action.type) {
    case BEER_REVIEW:
      return {
        ...state,
        beers: action.beers,
      };
    default:
      return state;
  }
};
