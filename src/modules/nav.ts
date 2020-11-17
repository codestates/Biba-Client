import { BeerT, BeerI } from './getbeers';

const SET_SEARCHBAR = 'SET_SEARCHBAR' as const;
const SET_BEERS = 'SET_BEERS' as const;
const SET_NAVDISPLAY = 'SET_NAVDISPLAY' as const;
const SET_REQUESTTYPE = 'SET_REQUESTTYPE' as const;
const SET_MYBEERTYPE = 'SET_MYBEERTYPE' as const;
const SET_SELECTEDBEER = 'SET_SELECTEDBEER' as const;
const SET_VISITCOUNT = 'SET_VISITCOUNT' as const;
const SET_MENUDISPLAY = 'SET_MENUDISPLAY' as const;

export interface SearchbarState {
  display: boolean;
}

export interface BtnColor {
  btn: string;
  text: string;
}
export interface NavDisplay {
  display: boolean;
}

export interface BeerRequest {
  request1: boolean;
  request2: boolean;
}
export interface MyBeerList {
  option1: boolean;
  option2: boolean;
}

export interface SelectedBeer {
  id: number;
}

export interface VisitCount {
  count: number | string;
}

export interface MenuDisplay {
  display: boolean;
}
// 이하로 action interface + init + action
interface SearchbarStateAction extends SearchbarState {
  type: typeof SET_SEARCHBAR;
}
const searchbarInit: SearchbarState = {
  display: false,
};
export const setSearchbar = (display: boolean): SearchbarStateAction => ({
  type: SET_SEARCHBAR,
  display,
});

export interface SetBeerAction extends BeerI {
  type: typeof SET_BEERS;
}

const beersInit: BeerI = {
  beers: [],
};

export const searchBeerAction = (beers: Array<BeerT>): SetBeerAction => {
  return {
    type: SET_BEERS,
    beers: beers,
  };
};

export interface NavDisplayAction extends NavDisplay {
  type: typeof SET_NAVDISPLAY;
}
const displayInit: NavDisplay = {
  display: true,
};
export const setNavDisplay = (display: boolean): NavDisplayAction => ({
  type: SET_NAVDISPLAY,
  display,
});

interface BeerRequestAction extends BeerRequest {
  type: typeof SET_REQUESTTYPE;
}
const requestInit: BeerRequest = {
  request1: true,
  request2: false,
};
export const setRequestType = (
  request1: boolean,
  request2: boolean,
): BeerRequestAction => ({
  type: SET_REQUESTTYPE,
  request1,
  request2,
});

interface MyBeerListAction extends MyBeerList {
  type: typeof SET_MYBEERTYPE;
}
const mybeerInit: MyBeerList = {
  option1: true,
  option2: false,
};
export const setMyBeerListType = (
  option1: boolean,
  option2: boolean,
): MyBeerListAction => ({
  type: SET_MYBEERTYPE,
  option1,
  option2,
});

interface SelectedBeerAction extends SelectedBeer {
  type: typeof SET_SELECTEDBEER;
}
const selectedBeerInit: SelectedBeer = {
  id: -1,
};
export const setSelectedBeer = (id: number): SelectedBeerAction => ({
  type: SET_SELECTEDBEER,
  id,
});

interface VisitCountAction extends VisitCount {
  type: typeof SET_VISITCOUNT;
}
const setVisitCountInit: VisitCount = {
  count: '',
};
export const setVisitedCount = (count: number | string): VisitCountAction => ({
  type: SET_VISITCOUNT,
  count,
});

interface MenuDisplayAction extends MenuDisplay {
  type: typeof SET_MENUDISPLAY;
}
const menuDisplayInit: MenuDisplay = {
  display: false,
};
export const setMenuDisplay = (display: boolean): MenuDisplayAction => ({
  type: SET_MENUDISPLAY,
  display,
});
// ============ 이하로 reducers
export const searchbarReducer = (
  state = searchbarInit,
  action: SearchbarStateAction,
): SearchbarState => {
  switch (action.type) {
    case SET_SEARCHBAR:
      return {
        ...state,
        display: action.display,
      };

    default:
      return state;
  }
};

export const searchBeerReducer = (
  state: BeerI = beersInit,
  action: SetBeerAction,
): BeerI => {
  switch (action.type) {
    case SET_BEERS:
      return {
        ...state,
        beers: action.beers,
      };
    default:
      return state;
  }
};

export const navDisplayReducer = (
  state = displayInit,
  action: NavDisplayAction,
): NavDisplay => {
  switch (action.type) {
    case SET_NAVDISPLAY:
      return {
        ...state,
        display: action.display,
      };

    default:
      return state;
  }
};

export const beerRequestReducer = (
  state = requestInit,
  action: BeerRequestAction,
): BeerRequest => {
  switch (action.type) {
    case SET_REQUESTTYPE:
      return {
        ...state,
        request1: action.request1,
        request2: action.request2,
      };

    default:
      return state;
  }
};

export const myBeerListTypeReducer = (
  state = mybeerInit,
  action: MyBeerListAction,
): MyBeerList => {
  switch (action.type) {
    case SET_MYBEERTYPE:
      return {
        ...state,
        option1: action.option1,
        option2: action.option2,
      };

    default:
      return state;
  }
};

export const selectedBeerReducer = (
  state = selectedBeerInit,
  action: SelectedBeerAction,
): SelectedBeer => {
  switch (action.type) {
    case SET_SELECTEDBEER:
      return {
        ...state,
        id: action.id,
      };

    default:
      return state;
  }
};

export const visitCountReducer = (
  state = setVisitCountInit,
  action: VisitCountAction,
): VisitCount => {
  switch (action.type) {
    case SET_VISITCOUNT:
      return {
        ...state,
        count: action.count,
      };

    default:
      return state;
  }
};

export const menuDisplayReducer = (
  state = menuDisplayInit,
  action: MenuDisplayAction,
): MenuDisplay => {
  switch (action.type) {
    case SET_MENUDISPLAY:
      return {
        ...state,
        display: action.display,
      };

    default:
      return state;
  }
};
