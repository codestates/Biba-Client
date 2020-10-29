import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { BeerT, BEER_FAVORITE } from '../../modules/getbeers';
import FavoriteBeerList from '../../components/list/FavoriteBeerList';
import { HomeProps } from '../../containers/page/HomeContainer';
import axios from 'axios';

function FavoriteBeerListContainer({
  match,
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const favoriteBeerList = useSelector(
    (state: RootState) => state.favoriteBeer.beers,
  );
  const { token } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  const setFavoriteBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_FAVORITE, beers });
  };

  useEffect(() => {
    axios
      .post<BeerT[]>(`https://beer4.xyz/bookmark/list`, {
        token: token,
      })
      .then((res) => {
        console.log(res.data);
        setFavoriteBeers(res.data);
      });
  }, []);
  return (
    <FavoriteBeerList
      beers={favoriteBeerList}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const FavoriteBeerListContainerWithRouter = withRouter(
  FavoriteBeerListContainer,
);
