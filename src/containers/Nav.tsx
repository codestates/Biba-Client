import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../modules';
import { Nav } from '../components/nav/Nav';

export interface NavProps {
  setSignin: (
    userData: { id: number; username: string },
    isSignin: boolean,
    token: string,
  ) => void;
  setSearchBar: (iconState: boolean, barState: boolean) => void;
  userData: {
    id: number;
    username: string;
  };
  syncBtns(): void;
  isSignin: boolean;
  token: string;
  iconDisplay: boolean;
  barDisplay: boolean;
}

export const NavContainer = (): JSX.Element => {
  const { userData, isSignin, token } = useSelector(
    (state: RootState) => state.signin,
  );
  const { iconDisplay, barDisplay } = useSelector(
    (state: RootState) => state.searchBar,
  );

  const dispatch = useDispatch();

  const setSignin = (
    userData: { id: number; username: string },
    isSignin: boolean,
    token: string,
  ): void => {
    dispatch({ type: 'SET_SIGNIN', userData, isSignin, token });
  };

  const setSearchBar = (iconState: boolean, barState: boolean): void => {
    dispatch({ type: 'SET_SEARCHBAR', iconState, barState });
  };

  const syncBtns = (): void => {
    isSignin
      ? setSignin({ id: 0, username: '' }, false, '')
      : setSignin({ id: 100, username: 'USER1' }, true, 'test token');
    isSignin ? setSearchBar(true, false) : setSearchBar(false, true);
  };

  return (
    <Nav
      setSignin={setSignin}
      setSearchBar={setSearchBar}
      userData={userData}
      isSignin={isSignin}
      token={token}
      iconDisplay={iconDisplay}
      barDisplay={barDisplay}
      syncBtns={syncBtns}
    />
  );
};

export const NavContainerWithRouter = withRouter(NavContainer); // nav도 router 필요한지 체크 필요
