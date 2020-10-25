import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';
import { Nav } from '../../components/nav/Nav';
import { Beers, Beer } from '../../modules/nav';

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
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSearch(): void;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
  testBeerRequestModal(): void;
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
  const handleClickTodayBeer = (): void => {
    dispatch({ type: 'TODAY_BEER' });
  };
  const handleNavDisplay = (display: boolean) => {
    dispatch({ type: 'SET_NAVDISPLAY', display });
  };

  const logout = () => {
    // 로그아웃 - store에서 프로필 삭제, 사용자 정보 삭제
    removeProfile();
    setLogout();
    handleClickTodayBeer();
    handleNavDisplay(true);
    alert('로그아웃 되었습니다.'); // 로그아웃 시 렌더링 오류
    props.history.push('/');
  };

  const handleClickLogo = (): void => {
    handleClickTodayBeer();
    props.history.push('/');
  };
  const handleClickLogin = (): void => {
    props.history.push('/login');
  };
  const handleClickLogout = (): void => {
    logout();
    props.history.push('/');
  };
  const handleClickSignup = (): void => {
    props.history.push('/signup');
  };
  const handleClickMypage = (): void => {
    props.history.push('/mypage');
  };

  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const testLoginModal = (): void => {
    // 임시로 nav에 배치 - list page에서 일정 수준 이상 스크롤 시 등장, 로그인이 아닌 상태일 때만 나타나야 함
    handleModal(ContentType.Login, true);
  };

  const setBeers = (beers: Beer[]): void => {
    dispatch({ type: 'SET_BEERS', beers });
  };

  const [inputQuery, setInputQuery] = useState('');
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    setInputQuery(value);
  };

  const handleSearch = (): void => {
    axios
      .post<Beers>('http://localhost:4000/users/login', {
        // 임시 주소
        query: inputQuery,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          const beers = res.data.beers;
          // 받은 데이터로 store 상태 업데이트
          setBeers(beers);
          dispatch({ type: 'SEARCH_BEER' });
        }
      })
      .catch(() => {
        dispatch({ type: 'SEARCH_BEER' });
      });
  };

  const testBeerRequestModal = (): void => {
    // 임시로 nav에 배치 - list page에서 일정 수준 이상 스크롤 시 등장, 로그인이 아닌 상태일 때만 나타나야 함
    handleModal(ContentType.RequestBeer, true);
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSearch();
  };

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
      handleOnChange={handleOnChange}
      handleSearch={handleSearch}
      pressEnter={pressEnter}
      testBeerRequestModal={testBeerRequestModal}
    />
  );
};

export const NavContainerWithRouter = withRouter(NavContainer); // nav도 router 필요한지 체크 필요
