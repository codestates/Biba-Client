import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { RootState } from '../../modules';
import { BeerT, BEER_TODAY } from '../../modules/getbeers';
import { HomeProps } from '../../containers/page/HomeContainer';
import axios from 'axios';

import TodayBeerList from '../../components/list/TodayBeerList';
import LoadingAnimation from '../../components/page/LoadingAnimation';

function TodayBeerListContainer({
  match,
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const todayBeers = useSelector((state: RootState) => state.todayBeer.beers);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  const setTodayBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_TODAY, beers });
  };

  useEffect(() => {
    trackPromise(
      axios.get<BeerT[]>(`https://beer4.xyz/beer/list`).then((res) => {
        setTodayBeers(res.data);
      }),
    );
  }, []);

  return (
    <>
      <TodayBeerList
        beers={todayBeers}
        setBeerDetail={setBeerDetail}
        setAllReviews={setAllReviews}
      />
      <LoadingAnimation />
    </>
  );
}

export const TodayBeerListContainerWithRouter = withRouter(
  TodayBeerListContainer,
);
