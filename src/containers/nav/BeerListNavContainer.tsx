import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../modules';
import BeerListNav from '../../components/nav/BeerListNav';
import { TODAY_BEER, WANTSOME_BEER, MY_BEER } from '../../modules/changepage';

export interface BeerListNavProps {
  isLogin: boolean;
  handleClickTodayBeer(): void;
  handleClickWantSomeBeer(): void;
  handleClickMyBeer(): void;
}

export const BeerListNavContainer = (props: RouterProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const handleClickTodayBeer = (): void => {
    dispatch({ type: TODAY_BEER });
  };
  const handleClickWantSomeBeer = (): void => {
    dispatch({ type: WANTSOME_BEER });
  };
  const handleClickMyBeer = (): void => {
    dispatch({ type: MY_BEER });
  };
  return (
    <BeerListNav
      isLogin={isLogin}
      handleClickTodayBeer={handleClickTodayBeer}
      handleClickWantSomeBeer={handleClickWantSomeBeer}
      handleClickMyBeer={handleClickMyBeer}
    />
  );
};

export const BeerListNavContainerWithRouter = withRouter(BeerListNavContainer);
