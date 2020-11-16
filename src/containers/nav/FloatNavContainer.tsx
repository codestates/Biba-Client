import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RootState } from '../../modules';
import FloatNav from '../../components/nav/FloatNav';
import {
  TODAY_BEER,
  WANTSOME_BEER,
  FAVORITE,
  REVIEW,
} from '../../modules/changepage';
import { ContentType } from '../../modules/modal';

export interface BeerListNavProps {
  isLogin: boolean;
  handleClickTodayBeer(): void;
  handleClickWantSomeBeer(): void;
  handleClickFavorite(): void;
  handleClickReview(): void;
  display: boolean;
  redirectHome(): void;
  redirectLogin(): void;
  handleClickGuest(): void;
}

export const FloatNavContainer = ({
  match,
  history,
  location,
}: RouteComponentProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const { display } = useSelector((state: RootState) => state.navDisplay);
  const dispatch = useDispatch();

  const handleClickTodayBeer = (): void => {
    dispatch({ type: TODAY_BEER });
  };
  const handleClickWantSomeBeer = (): void => {
    dispatch({ type: WANTSOME_BEER });
  };
  const handleClickFavorite = (): void => {
    dispatch({ type: FAVORITE });
  };
  const handleClickReview = (): void => {
    dispatch({ type: REVIEW });
  };
  const handleClickGuest = (): void => {
    dispatch({
      type: 'SET_MODAL',
      contentType: ContentType.Login,
      display: true,
    });
  };

  const redirectHome = () => history.push('/');
  const redirectLogin = () => history.push('/login');
  return (
    <FloatNav
      isLogin={isLogin}
      handleClickTodayBeer={handleClickTodayBeer}
      handleClickWantSomeBeer={handleClickWantSomeBeer}
      handleClickFavorite={handleClickFavorite}
      handleClickReview={handleClickReview}
      display={display}
      redirectHome={redirectHome}
      redirectLogin={redirectLogin}
      handleClickGuest={handleClickGuest}
    />
  );
};

export const FloatNavContainerWithRouter = withRouter(FloatNavContainer);
