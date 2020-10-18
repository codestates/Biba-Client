const SET_SEARCHBAR = 'SET_SEARCHBAR' as const;

export interface SearchBarState {
  iconDisplay: boolean;
  barDisplay: boolean;
}

interface SetSearchBar extends SearchBarState {
  type: typeof SET_SEARCHBAR;
}

const init: SearchBarState = {
  iconDisplay: true,
  barDisplay: false,
};

export const setSearchBar = (
  iconDisplay: boolean,
  barDisplay: boolean,
): SetSearchBar => ({
  type: SET_SEARCHBAR,
  iconDisplay,
  barDisplay,
});

export const searchBarReducer = (
  state = init,
  action: SetSearchBar,
): SearchBarState => {
  switch (action.type) {
    case SET_SEARCHBAR:
      return {
        ...state,
        iconDisplay: action.iconDisplay,
        barDisplay: action.barDisplay,
      };

    default:
      return state;
  }
};

// export type SearchBarAction = ReturnType<typeof setSearchBar>;
