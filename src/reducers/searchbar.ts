import { SET_SEARCHBAR } from '../actions';
import { SetSearchBar } from '../actions';

export interface SearchBar {
  iconDisplay: boolean;
  barDisplay: boolean;
}

const init: SearchBar = {
  iconDisplay: true,
  barDisplay: false,
};

export const searchBarReducer = (
  state = init,
  action: SetSearchBar,
): SearchBar => {
  switch (action.type) {
    case SET_SEARCHBAR:
      return {
        ...state,
        iconDisplay: action.iconState,
        barDisplay: action.barState,
      };

    default:
      return state;
  }
};
