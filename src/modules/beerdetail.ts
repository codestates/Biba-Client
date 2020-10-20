const SET_BEERDETAIL = 'SET_BEERDETAIL' as const;

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
  data: IBeerDetail;
}

// 이하로 action interface + init + action
export interface BeerDetailAction extends ObjBeerDetail {
  type: typeof SET_BEERDETAIL;
}
export const beerDetailInit: ObjBeerDetail = {
  data: {
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
export const setBeerDetail = (data: IBeerDetail): BeerDetailAction => ({
  type: SET_BEERDETAIL,
  data,
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
        data: action.data,
      };

    default:
      return state;
  }
};
