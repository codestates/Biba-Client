export const BEER_LOADING = 'BEER_LOADING';
export const BEER_FAIL = 'BEER_FAIL';
export const BEER_SUCCESS = 'BEER_SUCCESS';

export type BeerT = {
  id: number;
  beer_name: string;
  beer_img: string;
  rate: number;
};

export interface BeerLoading {
  type: typeof BEER_LOADING;
}

export interface BeerFail {
  type: typeof BEER_FAIL;
}

export interface BeerSuccess {
  type: typeof BEER_SUCCESS;
  payload: {
    beers: Array<BeerT>;
  };
}

export type BeerDispatchTypes = BeerLoading | BeerFail | BeerSuccess;

export interface DefaultStateI {
  isloading: boolean;
  beers: BeerT[];
}

const defaultState: DefaultStateI = {
  isloading: false,
  beers: [],
};

export const searchBeerAction = (beers: BeerT[]): BeerSuccess => {
  return {
    type: BEER_SUCCESS,
    payload: {
      beers: beers,
    },
  };
};

export const searchBeerReducer = (
  state: DefaultStateI = defaultState,
  action: BeerDispatchTypes,
): DefaultStateI => {
  switch (action.type) {
    case BEER_LOADING:
      return {
        isloading: true,
        beers: [],
      };
    case BEER_FAIL:
      return state;
    case BEER_SUCCESS:
      return {
        ...state,
        isloading: false,
        beers: action.payload.beers,
      };
    default:
      return state;
  }
};
