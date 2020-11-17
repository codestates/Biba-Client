import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DefaultProps } from '../page/HomeContainer';

import { RootState } from '../../modules';
import FloatNav from '../../components/nav/FloatNav';
import {
  TODAY_BEER,
  WANTSOME_BEER,
  FAVORITE,
  REVIEW,
  MYPAGE,
  MOBILE_SEARCH,
  MOBILE_MYBEER,
} from '../../modules/changepage';

import { ContentType } from '../../modules/modal';
import MobileMyBeer from '../../components/mobile/MobileMyBeer';

export interface FloatNavProps {
  isLogin: boolean;
  handleClickTodayBeer(): void;
  handleClickMobileSearch(): void;
  // handleClickWantSomeBeer(): void;
  // handleClickFavorite(): void;
  // handleClickReview(): void;
  handleClickMypage(): void;
  handleClickMyBeer(): void;
  display: boolean;
  redirectHome(): void;
  redirectLogin(): void;
  handleClickGuest(): void;
  handleClickMobileGuest(): void;
}

export const FloatNavContainer = (props: DefaultProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const { display } = useSelector((state: RootState) => state.navDisplay);
  const dispatch = useDispatch();

  const handleNavDisplay = (display: boolean) => {
    dispatch({ type: 'SET_NAVDISPLAY', display });
  };
  const handleClickTodayBeer = (): void => {
    dispatch({ type: TODAY_BEER });
  };
  const handleClickMobileSearch = (): void => {
    dispatch({ type: MOBILE_SEARCH });
    props.history.push('/msearch');
  };
  // const handleClickWantSomeBeer = (): void => {
  //   dispatch({ type: WANTSOME_BEER });
  // };
  // const handleClickFavorite = (): void => {
  //   dispatch({ type: FAVORITE });
  // };
  // const handleClickReview = (): void => {
  //   dispatch({ type: REVIEW });
  // };
  const handleClickMypage = (): void => {
    dispatch({ type: MYPAGE });
    handleNavDisplay(false);
    props.history.push('/mypage');
  };
  const handleClickMyBeer = (): void => {
    dispatch({ type: MOBILE_MYBEER });
  };
  const handleClickGuest = (): void => {
    dispatch({
      type: 'SET_MODAL',
      contentType: ContentType.Login,
      display: true,
    });
  };
  const handleClickMobileGuest = (): void => {
    dispatch({
      type: 'SET_BOTTOM_MODAL',
      contentType: ContentType.Login,
      display: true,
    });
  };

  const redirectHome = () => props.history.push('/');
  const redirectLogin = () => props.history.push('/login');
  return (
    <FloatNav
      isLogin={isLogin}
      handleClickTodayBeer={handleClickTodayBeer}
      handleClickMobileSearch={handleClickMobileSearch}
      // handleClickWantSomeBeer={handleClickWantSomeBeer}
      // handleClickFavorite={handleClickFavorite}
      // handleClickReview={handleClickReview}
      handleClickMypage={handleClickMypage}
      handleClickMyBeer={handleClickMyBeer}
      display={display}
      redirectHome={redirectHome}
      redirectLogin={redirectLogin}
      handleClickGuest={handleClickGuest}
      handleClickMobileGuest={handleClickMobileGuest}
    />
  );
};

export const FloatNavContainerWithRouter = withRouter(FloatNavContainer);
