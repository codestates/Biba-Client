import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { BeerT, BEER_TODAY } from '../../modules/getbeers';
import { IBeerDetail, ObjBeerDetail } from '../../modules/beerdetail';
import TodayBeerList from '../../components/list/TodayBeerList';
import { HomeProps } from '../../containers/page/HomeContainer';
import axios from 'axios';

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
    axios.get<BeerT[]>(`https://beer4.xyz/beer/list`).then((res) => {
      setTodayBeers(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <TodayBeerList
      beers={todayBeers}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const TodayBeerListContainerWithRouter = withRouter(
  TodayBeerListContainer,
);
