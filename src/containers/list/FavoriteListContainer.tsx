import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { BeerT, BEER_FAVORITE } from '../../modules/getbeers';
import FavoriteBeerList from '../../components/list/FavoriteBeerList';
import axios from 'axios';

function FavoriteBeerListContainer(): JSX.Element {
  const favoriteBeerList = useSelector(
    (state: RootState) => state.favoriteBeer.beers,
  );
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  const setFavoriteBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_FAVORITE, beers });
  };

  useEffect(() => {
    axios.get<BeerT[]>('https://biba.com/beer/list-all').then((res) => {
      setFavoriteBeers(res.data);
    });
  }, [setFavoriteBeers]);
  return <FavoriteBeerList beers={favoriteBeerList} />;
}

export const FavoriteBeerListContainerWithRouter = withRouter(
  FavoriteBeerListContainer,
);
