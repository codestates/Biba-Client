import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../modules';
import BeerListNav from '../../components/nav/BeerListNav';

export interface BeerListNavProps {
  isLogin: boolean;
  handleClickTodayBeer(): void;
  handleClickWantSomeBeer(): void;
  handleClickMyBeer(): void;
}

export const BeerListNavContainer = (props: RouterProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  //   const setLogout = () => {
  //     dispatch({ type: 'SET_LOGOUTSTATE' });
  //   };
  //   const setProfile = () => {
  //     dispatch({ type: 'DELETE_PROFILE' });
  //   };
  //   const setSearchBar = (iconDisplay: boolean, barDisplay: boolean): void => {
  //     dispatch({ type: 'SET_SEARCHBAR', iconDisplay, barDisplay });
  //   };
  const handleClickTodayBeer = (): void => {
    props.history.push('/');
  };
  const handleClickWantSomeBeer = (): void => {
    props.history.push('/wantsomebeer');
  };
  const handleClickMyBeer = (): void => {
    props.history.push('/mybeer');
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
