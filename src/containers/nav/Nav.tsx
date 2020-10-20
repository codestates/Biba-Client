import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
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
  logout(): void;
  handleClickLogo(): void;
  handleClickLogin(): void;
  handleClickLogout(): void;
  handleClickSignup(): void;
  handleClickMypage(): void;
  testLoginModal(): void;
  testDetail(): void;
}

export const NavContainer = (props: RouterProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  const { display } = useSelector((state: RootState) => state.navDisplay);

  const dispatch = useDispatch();
  const setLogout = () => {
    dispatch({ type: 'SET_LOGOUTSTATE' });
  };
  const removeProfile = () => {
    dispatch({ type: 'DELETE_PROFILE' });
  };

  const logout = () => {
    // 로그아웃 - store에서 프로필 삭제, 사용자 정보 삭제
    removeProfile();
    setLogout();
  };

  const handleClickTodayBeer = (): void => {
    dispatch({ type: 'TODAY_BEER' });
  };

  const handleClickLogo = (): void => {
    handleClickTodayBeer();
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
  const testDetail = (): void => {
    props.history.push('/beer/detail');
  };

  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const testLoginModal = (): void => {
    // 임시로 nav에 배치 - list page에서 일정 수준 이상 스크롤 시 등장, 로그인이 아닌 상태일 때만 나타나야 함
    handleModal(ContentType.Login, true);
  };

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   console.log(e.currentTarget);
  // };

  return (
    <Nav
      userData={userData}
      isLogin={isLogin}
      token={token}
      profile={profile}
      logout={logout}
      handleClickLogo={handleClickLogo}
      handleClickLogin={handleClickLogin}
      handleClickLogout={handleClickLogout}
      handleClickSignup={handleClickSignup}
      handleClickMypage={handleClickMypage}
      testLoginModal={testLoginModal}
      testDetail={testDetail}
    />
  );
};

export const NavContainerWithRouter = withRouter(NavContainer); // nav도 router 필요한지 체크 필요
