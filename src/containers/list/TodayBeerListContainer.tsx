import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import TodayBeerList from '../../components/list/TodayBeerList';
import axios from 'axios';

import { BeerT } from '../../modules/getbeers';
import { IBeerDetail, ObjBeerDetail } from '../../modules/beerdetail';
import { DefaultProps } from '../../containers/page/HomeContainer';

function TodayBeerListContainer({ match }: DefaultProps): JSX.Element {
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

  // store에 각각 beerdetail 넣는 함수
  const setBeerDetail = (beerDetail: IBeerDetail) => {
    dispatch({ type: 'SET_BEERDETAIL', beerDetail });
  };
  const getBeerDetail = (): void => {
    axios
      .get<IBeerDetail>(`http://localhost:4000/custom/scrap/${match.params.id}`)
      .then((res) => {
        setBeerDetail(res.data);
      });
  };

  return <TodayBeerList beers={todayBeers} />;
}

export const TodayBeerListContainerWithRouter = withRouter(
  TodayBeerListContainer,
);
