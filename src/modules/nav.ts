import { BeerT, BeerI } from './getbeers';

const SET_SEARCHBAR = 'SET_SEARCHBAR' as const;
const SET_MODAL = 'SET_MODAL' as const;
const SET_BEERS = 'SET_BEERS' as const;
const SET_NAVDISPLAY = 'SET_NAVDISPLAY' as const;
const SET_REQUESTTYPE = 'SET_REQUESTTYPE' as const;
const SET_MYBEERTYPE = 'SET_MYBEERTYPE' as const;
const SET_SELECTEDBEER = 'SET_SELECTEDBEER' as const;

export interface SearchbarState {
  display: boolean;
}

export interface ModalContent {
  contentType: ContentType;
}
export interface ModalState extends ModalContent {
  display: boolean;
}
export enum ContentType {
  Empty,
  Login,
  MypageAllReviews,
  ChangeNickname,
  MyBeerList,
  UsersReview,
  AllReviews,
  RequestBeer,
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

interface ModalStateAction extends ModalState {
  type: typeof SET_MODAL;
}
const modalInit: ModalState = {
  contentType: ContentType.Empty,
  display: false,
};
export const setModal = (
  contentType: ContentType,
  display: boolean,
): ModalStateAction => ({
  type: SET_MODAL,
  contentType,
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

export const modalReducer = (
  state = modalInit,
  action: ModalStateAction,
): ModalState => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        contentType: action.contentType,
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
