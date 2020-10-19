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

export const getBeerAction = (beers: BeerT[]): BeerSuccess => {
  return {
    type: BEER_SUCCESS,
    payload: {
      beers: beers,
    },
  };
};

export const getBeerReducer = (
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
