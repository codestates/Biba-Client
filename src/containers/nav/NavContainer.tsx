import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/modal';
import { Nav } from '../../components/nav/Nav';
import { BeerT } from '../../modules/getbeers';
import { beerDetailInit, compareBeerInit } from '../../modules/beerdetail';
import { DefaultProps } from '../page/HomeContainer';
import { queryAllByAltText } from '@testing-library/react';
import { useEffect } from 'react';

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
  handleClickLogo(): void;
  handleClickLogin(): void;
  handleClickLogout(): void;
  handleClickSignup(): void;
  handleClickMypage(): void;
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  searchbarDisplay: boolean;
  handleClickIcon(display: boolean): void;
  handleSearch(): void;
  sideMenuDisplay: boolean;
  handleClickHiddenMenu(display: boolean): void;
  bottomModalDisplay: boolean;
  handleBottomModal(contentType: ContentType, display: boolean): void;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
}

export const NavContainer = (props: DefaultProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  const sideMenuDisplay = useSelector(
    (state: RootState) => state.menuDisplay.display,
  );
  const searchbarDisplay = useSelector(
    (state: RootState) => state.searchbar.display,
  );
  const handleClickHiddenMenu = (display: boolean): void => {
    dispatch({ type: 'SET_MENUDISPLAY', display: display });
  };
  const bottomModalDisplay = useSelector(
    (state: RootState) => state.bottomModal.display,
  );

  const dispatch = useDispatch();
  const handleClickTodayBeer = (): void => {
    dispatch({ type: 'TODAY_BEER' });
  };
  const handleNavDisplay = (display: boolean) => {
    dispatch({ type: 'SET_NAVDISPLAY', display: display });
  };
  const handleBottomModal = (contentType: ContentType, display: boolean) => {
    dispatch({
      type: 'SET_BOTTOM_MODAL',
      contentType: contentType,
      display: display,
    });
  };

  const handleClickLogo = (): void => {
    handleClickTodayBeer();
    handleNavDisplay(true);
    props.history.push('/');
  };
  const handleClickLogin = (): void => {
    if (props.location.pathname === '/login') {
      return;
    } else if (
      props.location.pathname === '/' ||
      props.location.pathname === '/signup'
    ) {
      handleNavDisplay(false);
      return props.history.push('/login');
    } else {
      dispatch({
        type: 'SET_MODAL',
        contentType: ContentType.Login,
        display: true,
      });
    }
  };
  const handleClickLogout = (): void => {
    axios
      .get(`https://beer4.xyz/users/logout`, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          dispatch({ type: 'DELETE_PROFILE' });
          dispatch({ type: 'SET_LOGOUTSTATE' });
          dispatch({
            type: 'SET_INFOSTATUS',
            tabBasic: true,
            tabStory: false,
            tabMore: false,
          });
          dispatch({
            type: 'SET_INFODISPLAY',
            disBasic: true,
            disStory: true,
            disMore: true,
          });
          dispatch({ type: 'SET_SELECTEDBEER', id: -1 });
          dispatch({
            type: 'SET_COMPAREBEER',
            compareBeer: compareBeerInit.compareBeer,
          });
          handleClickTodayBeer();
          handleNavDisplay(true);
          props.history.push('/');
        }
      });
  };
  const handleClickSignup = (): void => {
    handleNavDisplay(false);
    props.history.push('/signup');
  };
  const handleClickMypage = (): void => {
    handleNavDisplay(false);
    props.history.push('/mypage');
  };

  // const handleModal = (contentType: ContentType, display: boolean): void => {
  //   dispatch({ type: 'SET_MODAL', contentType, display });
  // };

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
    if (inputQuery.query.length < 2) {
      alert('2글자 이상 입력해주세요.');
    } else {
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
    }
  };
  const handleCount = (): void => {
    axios.get(`https://beer4.xyz/count`).then((res) => {
      // console.log(res);
      const currentCount = res.data.totalVisits;
      dispatch({ type: 'SET_VISITCOUNT', count: currentCount });
    });
  };
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      {
        (useEffect(() => {
          handleCount();
        }),
        [])
      }
      <Nav
        userData={userData}
        isLogin={isLogin}
        token={token}
        profile={profile}
        inputQuery={inputQuery}
        handleClickLogo={handleClickLogo}
        handleClickLogin={handleClickLogin}
        handleClickLogout={handleClickLogout}
        handleClickSignup={handleClickSignup}
        handleClickMypage={handleClickMypage}
        handleOnChange={handleOnChange}
        searchbarDisplay={searchbarDisplay}
        handleClickIcon={handleClickIcon}
        handleSearch={handleSearch}
        sideMenuDisplay={sideMenuDisplay}
        handleClickHiddenMenu={handleClickHiddenMenu}
        bottomModalDisplay={bottomModalDisplay}
        handleBottomModal={handleBottomModal}
        pressEnter={pressEnter}
      />
    </>
  );
};

export const NavContainerWithRouter = withRouter(NavContainer); // nav도 router 필요한지 체크 필요
