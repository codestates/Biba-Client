import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../modules';
import { Nav } from '../components/nav/Nav';

export interface NavProps {
  setLogin: (
    userData: { id: number; username: string },
    isLogin: boolean,
    token: string,
  ) => void;
  setSearchBar: (iconState: boolean, barState: boolean) => void;
  userData: {
    id: number;
    username: string;
  };
  syncBtns(): void;
  isLogin: boolean;
  token: string;
  iconDisplay: boolean;
  barDisplay: boolean;
}

export const NavContainer = (): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { iconDisplay, barDisplay } = useSelector(
    (state: RootState) => state.searchBar,
  );

  const dispatch = useDispatch();

  const setLogin = (
    userData: { id: number; username: string },
    isLogin: boolean,
    token: string,
  ): void => {
    dispatch({ type: 'SET_LOGIN', userData, isLogin, token });
  };

  const setSearchBar = (iconState: boolean, barState: boolean): void => {
    dispatch({ type: 'SET_SEARCHBAR', iconState, barState });
  };

  const syncBtns = (): void => {
    isLogin
      ? setLogin({ id: 0, username: '' }, false, '')
      : setLogin({ id: 100, username: 'USER1' }, true, 'test token');
    isLogin ? setSearchBar(true, false) : setSearchBar(false, true);
  };

  return (
    <Nav
      setLogin={setLogin}
      setSearchBar={setSearchBar}
      userData={userData}
      isLogin={isLogin}
      token={token}
      iconDisplay={iconDisplay}
      barDisplay={barDisplay}
      syncBtns={syncBtns}
    />
  );
};

export const NavContainerWithRouter = withRouter(NavContainer); // nav도 router 필요한지 체크 필요
