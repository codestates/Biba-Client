const SET_SEARCHBAR = 'SET_SEARCHBAR' as const;

export interface SearchBar {
  iconDisplay: boolean;
  barDisplay: boolean;
}

const init: SearchBar = {
  iconDisplay: true,
  barDisplay: false,
};

interface SetSearchBar {
  type: typeof SET_SEARCHBAR;
  iconState: boolean;
  barState: boolean;
}

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

export const setSearchBar = (
  iconState: boolean,
  barState: boolean,
): SetSearchBar => ({
  type: SET_SEARCHBAR,
  iconState,
  barState,
});

export type SearchBarAction = ReturnType<typeof setSearchBar>;
