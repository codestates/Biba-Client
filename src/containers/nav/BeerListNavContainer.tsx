import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RootState } from '../../modules';
import BeerListNav from '../../components/nav/BeerListNav';
import { TODAY_BEER, WANTSOME_BEER, MY_BEER } from '../../modules/changepage';

export interface BeerListNavProps {
  isLogin: boolean;
  handleClickTodayBeer(): void;
  handleClickWantSomeBeer(): void;
  handleClickMyBeer(): void;
  display: boolean;
  redirectHome(): void;
}

export const BeerListNavContainer = ({
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
  const handleClickMyBeer = (): void => {
    dispatch({ type: MY_BEER });
  };
  const redirectHome = () => history.push('/');
  return (
    <BeerListNav
      isLogin={isLogin}
      handleClickTodayBeer={handleClickTodayBeer}
      handleClickWantSomeBeer={handleClickWantSomeBeer}
      handleClickMyBeer={handleClickMyBeer}
      display={display}
      redirectHome={redirectHome}
    />
  );
};

export const BeerListNavContainerWithRouter = withRouter(BeerListNavContainer);
