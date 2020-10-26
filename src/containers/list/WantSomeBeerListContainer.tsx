import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { BEER_HOT, BEER_LATE, BEER_PICK, BeerT } from '../../modules/getbeers';
import WantSomeBeerList from '../../components/list/WantSomeBeerList';
import axios from 'axios';

import { HomeProps } from '../../containers/page/HomeContainer';

function WantSomeBeerListContainer({
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const hotBeers = useSelector((state: RootState) => state.wantBeer.hotBeers);
  const lateBeers = useSelector((state: RootState) => state.wantBeer.lateBeers);
  const pickBeers = useSelector((state: RootState) => state.wantBeer.pickBeers);
  const dispatch = useDispatch();

  /* eslint-disable react-hooks/exhaustive-deps */
  const setHotBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_HOT, beers });
  };
  const setLateBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_LATE, beers });
  };
  const setPickBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_PICK, beers });
  };

  useEffect(() => {
    axios.get<BeerT[]>(`https://beer4.xyz/beer/list-popular`).then((res) => {
      setHotBeers(res.data);
    });
    axios.get<BeerT[]>(`https://beer4.xyz/beer/list-recent`).then((res) => {
      setLateBeers(res.data);
    });
    axios.get<BeerT[]>(`https://beer4.xyz/beer/list-favor`).then((res) => {
      setPickBeers(res.data);
    });
  }, []);

  return (
    <WantSomeBeerList
      hotBeers={hotBeers}
      lateBeers={lateBeers}
      pickBeers={pickBeers}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const WantSomeBeerListContainerWithRouter = withRouter(
  WantSomeBeerListContainer,
);
