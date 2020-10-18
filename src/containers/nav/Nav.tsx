import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../modules';
import { Nav } from '../../components/nav/Nav';

export interface NavProps {
  userData: {
    id: number;
    nickname: string;
    email: string;
  };
  isLogin: boolean;
  token: string;
  profile: string;
  iconDisplay: boolean;
  barDisplay: boolean;
  logout(): void;
  handleClickLogo(): void;
  handleClickLogin(): void;
  handleClickLogout(): void;
  handleClickSignup(): void;
  handleClickMypage(): void;
}

export const NavContainer = (props: RouterProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  const { iconDisplay, barDisplay } = useSelector(
    (state: RootState) => state.navBar,
  );
  const dispatch = useDispatch();
  const setLogout = () => {
    dispatch({ type: 'SET_LOGOUTSTATE' });
  };
  const removeProfile = () => {
    dispatch({ type: 'DELETE_PROFILE' });
  };
  const setSearchBar = (iconDisplay: boolean, barDisplay: boolean): void => {
    dispatch({ type: 'SET_SEARCHBAR', iconDisplay, barDisplay });
  };

  const logout = () => {
    // 로그아웃 - searchbar 상태 변경, store에서 사용자 정보 삭제, 프로필 삭제
    setSearchBar(true, false);
    setLogout();
    removeProfile();
  };

  const handleClickLogo = (): void => {
    props.history.push('/');
  };
  const handleClickLogin = (): void => {
    props.history.push('/login');
  };
  const handleClickLogout = (): void => {
    console.log('/logout');
  };
  const handleClickSignup = (): void => {
    props.history.push('/signup');
  };
  const handleClickMypage = (): void => {
    props.history.push('/mypage');
  };

  return (
    <Nav
      userData={userData}
      isLogin={isLogin}
      token={token}
      profile={profile}
      iconDisplay={iconDisplay}
      barDisplay={barDisplay}
      logout={logout}
      handleClickLogo={handleClickLogo}
      handleClickLogin={handleClickLogin}
      handleClickLogout={handleClickLogout}
      handleClickSignup={handleClickSignup}
      handleClickMypage={handleClickMypage}
    />
  );
};

export const NavContainerWithRouter = withRouter(NavContainer); // nav도 router 필요한지 체크 필요
