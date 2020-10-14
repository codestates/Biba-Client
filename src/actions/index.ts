export const SET_SIGNIN = 'SET_SIGNIN';
export const SET_SEARCHBAR = 'SET_SEARCHBAR';

export interface SetSigninAction {
  type: typeof SET_SIGNIN;
  state: boolean;
  token: string;
}

export const setSignin = (state: boolean, token: string): SetSigninAction => ({
  type: SET_SIGNIN,
  state,
  token,
});

export interface SetSearchBar {
  type: typeof SET_SEARCHBAR;
  iconState: boolean;
  barState: boolean;
}

export const setSearchBar = (
  iconState: boolean,
  barState: boolean,
): SetSearchBar => ({
  type: SET_SEARCHBAR,
  iconState,
  barState,
});
