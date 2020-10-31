import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import {
  BeerT,
  BEER_FAVORITE_ABC,
  BEER_FAVORITE_RECENT,
} from '../../modules/getbeers';
import FavoriteBeerList from '../../components/list/FavoriteBeerList';
import { HomeProps } from '../../containers/page/HomeContainer';
import axios from 'axios';

function FavoriteBeerListContainer({
  match,
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const abcBeers = useSelector(
    (state: RootState) => state.favoriteBeer.abcBeers,
  );
  const recentBeers = useSelector(
    (state: RootState) => state.favoriteBeer.recentBeers,
  );
  const { token } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  const setAbcFavoriteBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_FAVORITE_ABC, beers });
  };
  const setRecentFavoriteBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_FAVORITE_RECENT, beers });
  };

  useEffect(() => {
    axios
      .post<BeerT[]>(`https://beer4.xyz/bookmark/abc`, {
        token: token,
      })
      .then((res) => {
        setAbcFavoriteBeers(res.data);
      });
    axios
      .post<BeerT[]>(`https://beer4.xyz/bookmark/recent`, {
        token: token,
      })
      .then((res) => {
        setRecentFavoriteBeers(res.data);
      });
  }, []);

  return (
    <FavoriteBeerList
      abcBeers={abcBeers}
      recentBeers={recentBeers}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const FavoriteBeerListContainerWithRouter = withRouter(
  FavoriteBeerListContainer,
);
