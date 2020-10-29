import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';
import { Nav } from '../../components/nav/Nav';
import { BeerT } from '../../modules/getbeers';

export interface NavProps {
  userData: {
    id: number;
    nickname: string;
    email: string;
  };
  isLogin: boolean;
  token: string;
  profile: string;
  inputQuery: {
    query: string;
  };
  logout(): void;
  handleClickLogo(): void;
  handleClickLogin(): void;
  handleClickLogout(): void;
  handleClickSignup(): void;
  handleClickMypage(): void;
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  searchbarDisplay: boolean;
  handleClickIcon(display: boolean): void;
  handleSearch(): void;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
}

export const NavContainer = (props: RouterProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  const { display } = useSelector((state: RootState) => state.navDisplay);
  const searchbarDisplay = useSelector(
    (state: RootState) => state.searchbar.display,
  );

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
    handleNavDisplay(true);
    props.history.push('/');
  };
  const handleClickLogin = (): void => {
    handleNavDisplay(false);
    props.history.push('/login');
  };
  const handleClickLogout = (): void => {
    logout();
    props.history.push('/');
  };
  const handleClickSignup = (): void => {
    handleNavDisplay(false);
    props.history.push('/signup');
  };
  const handleClickMypage = (): void => {
    handleNavDisplay(false);
    props.history.push('/mypage');
  };

  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };

  const setBeers = (beers: BeerT[]): void => {
    dispatch({ type: 'SET_BEERS', beers });
  };

  const [inputQuery, setInputQuery] = useState({ query: '' });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { value } = e.target;
    setInputQuery({ ...inputQuery, query: value });
  };

  const handleClickIcon = (display: boolean): void => {
    dispatch({ type: 'SET_SEARCHBAR', display });
  };

  const handleSearch = (): void => {
    axios
      .get<Array<BeerT>>(`https://beer4.xyz/search/${inputQuery.query}`)
      .then((res) => {
        if (res.status === 200) {
          const beers = res.data;
          // console.log(beers);
          // 받은 데이터로 store 상태 업데이트
          setBeers(beers);
          dispatch({ type: 'SEARCH_BEER' });
          setInputQuery({ ...inputQuery, query: '' });
          handleNavDisplay(true);
          props.history.push('/');
        }
      })
      .catch(() => {
        dispatch({ type: 'SEARCH_BEER' });
      });
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
      inputQuery={inputQuery}
      logout={logout}
      handleClickLogo={handleClickLogo}
      handleClickLogin={handleClickLogin}
      handleClickLogout={handleClickLogout}
      handleClickSignup={handleClickSignup}
      handleClickMypage={handleClickMypage}
      handleOnChange={handleOnChange}
      searchbarDisplay={searchbarDisplay}
      handleClickIcon={handleClickIcon}
      handleSearch={handleSearch}
      pressEnter={pressEnter}
    />
  );
};

export const NavContainerWithRouter = withRouter(NavContainer); // nav도 router 필요한지 체크 필요
