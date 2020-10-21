import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { BeerT } from '../../modules/getbeers';
import { IBeerDetail, ObjBeerDetail } from '../../modules/beerdetail';
import { DefaultProps } from '../../containers/page/HomeContainer';
import TodayBeerList from '../../components/list/TodayBeerList';
import { HomeProps } from '../../containers/page/HomeContainer';
import axios from 'axios';

interface TBLCProps extends DefaultProps {
  setBeerDetail(e: React.MouseEvent<HTMLElement>): void;
  setAllReviews(e: React.MouseEvent<HTMLElement>): void;
}

function TodayBeerListContainer({
  match,
  setBeerDetail,
  setAllReviews,
}: TBLCProps): JSX.Element {
  const todayBeers = useSelector((state: RootState) => state.todayBeer.beers);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  const setTodayBeers = (beers: BeerT[]) => {
    dispatch({ type: 'BEER_SUCCESS', beers });
  };

  useEffect(() => {
    axios.get<BeerT[]>('https://biba.com/beer/list-all').then((res) => {
      setTodayBeers(res.data);
    });
  }, [setTodayBeers]);

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
