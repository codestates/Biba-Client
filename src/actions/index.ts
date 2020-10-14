export const SET_SIGNIN = 'SET_SIGNIN';

export interface SetSignInAction {
  type: typeof SET_SIGNIN;
  boolean: boolean;
}

export const setSignin = (boolean: boolean): SetSignInAction => ({
  type: SET_SIGNIN,
  boolean,
});
