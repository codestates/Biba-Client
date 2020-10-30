export const BEER_TODAY = 'today/BEER';
export const BEER_HOT = 'want/BEER_HOT';
export const BEER_LATE = 'want/BEER_LATE';
export const BEER_WHEAT = 'want/BEER_WHEAT';
export const BEER_GERMAN = 'want/BEER_GERMAN';
export const BEER_RECOMMEND = 'want/BEER_RECOMMEND';
export const BEER_FAVORITE = 'my/BEER_FAVORITE';
export const BEER_REVIEW = 'my/BEER_REVIEW';

// interface & type & default state
export type BeerT = {
  id: string;
  beer_name: string;
  beer_img: string;
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

export interface BeerFavorite {
  type: typeof BEER_FAVORITE;
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
  | BeerFavorite
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

export const favoriteBeerAction = (beers: BeerT[]): BeerFavorite => {
  return {
    type: BEER_FAVORITE,
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
  state: BeerI = defaultBeer,
  action: BeerDispatchTypes,
): BeerI => {
  switch (action.type) {
    case BEER_FAVORITE:
      return {
        ...state,
        beers: action.beers,
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
//gather beers
//fakedata
export const fakedata = [
  {
    id: 1,
    beer_name: '사무엘 아담스',
    beer_img:
      'https://storage.googleapis.com/cbmpress/uploads/sites/3/2018/10/cq5dam.web_.1280.1280.jpeg',
    rate: 5,
  },
  {
    id: 2,
    beer_name: '필스너 우르켈',
    beer_img:
      'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/6Eco/image/ZggWTCWAXmWOzG4ys4zLQsoI0Gc.jpg',
    rate: 1,
  },
  {
    id: 3,
    beer_name: 'KGB',
    beer_img:
      'https://lh3.googleusercontent.com/proxy/JBLK7UQzjVuf_1io378X3BFEvaX3FsakDrTzdguawXeOmHIFnJb_Bt9MpJRLGCr-3pMOXusBhhL7WB_vw2CQY9KnyhjXH9PzAiQ3SkoxSWoE8HoGLZ-p6PzAsItJFL4HVL62hkP-hHHFn8gZX9CTQhpaGASPQNvbFRdKBGQv4lTYNNY4NF-BuRiS4JWUvQ0nUFW5G1iJ',
    rate: 4,
  },
];
