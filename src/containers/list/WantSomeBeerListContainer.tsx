import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import {
  BEER_HOT,
  BEER_LATE,
  BEER_WHEAT,
  BEER_GERMAN,
  BEER_RECOMMEND,
  BeerT,
} from '../../modules/getbeers';
import WantSomeBeerList from '../../components/list/WantSomeBeerList';
import axios from 'axios';
import { HomeProps } from '../../containers/page/HomeContainer';

function WantSomeBeerListContainer({
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const { userData, isLogin } = useSelector((state: RootState) => state.login);
  const hotBeers = useSelector((state: RootState) => state.wantBeer.hotBeers);
  const lateBeers = useSelector((state: RootState) => state.wantBeer.lateBeers);
  const wheatBeers = useSelector(
    (state: RootState) => state.wantBeer.wheatBeers,
  );
  const germanBeers = useSelector(
    (state: RootState) => state.wantBeer.germanBeers,
  );
  const recommendBeers = useSelector(
    (state: RootState) => state.wantBeer.recommendBeers,
  );
  const dispatch = useDispatch();

  /* eslint-disable react-hooks/exhaustive-deps */
  const setHotBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_HOT, beers });
  };
  const setLateBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_LATE, beers });
  };
  const setWheatBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_WHEAT, beers });
  };
  const setGermanBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_GERMAN, beers });
  };
  const setRecommendBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_RECOMMEND, beers });
  };

  useEffect(() => {
    axios.get<BeerT[]>(`https://beer4.xyz/category/popular`).then((res) => {
      setHotBeers(res.data);
    });
    axios.get<BeerT[]>(`https://beer4.xyz/category/recent`).then((res) => {
      setLateBeers(res.data);
    });
    axios.get<BeerT[]>(`https://beer4.xyz/category/wheat`).then((res) => {
      setWheatBeers(res.data);
    });
    axios.get<BeerT[]>(`https://beer4.xyz/category/germany`).then((res) => {
      setGermanBeers(res.data);
    });
    axios
      .post<BeerT[]>(`https://beer4.xyz/category/recommend`, {
        user_id: userData.id,
      })
      .then((res) => {
        setRecommendBeers(res.data);
      });
  }, []);

  return (
    <WantSomeBeerList
      isLogin={isLogin}
      nickname={userData.nickname}
      hotBeers={hotBeers}
      lateBeers={lateBeers}
      wheatBeers={wheatBeers}
      germanBeers={germanBeers}
      recommendBeers={recommendBeers}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const WantSomeBeerListContainerWithRouter = withRouter(
  WantSomeBeerListContainer,
);
