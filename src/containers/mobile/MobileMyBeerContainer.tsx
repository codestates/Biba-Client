/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import {
  BeerT,
  BEER_FAVORITE_ABC,
  BEER_FAVORITE_RECENT,
  BEER_REVIEW,
} from '../../modules/getbeers';
import { HomeProps } from '../../containers/page/HomeContainer';
import axios from 'axios';
import MobileMyBeer from '../../components/mobile/MobileMyBeer';
import { FAVORITE, REVIEW } from '../../modules/changepage';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';

function MobileMyBeerContainer({
  match,
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const { token } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const abcBeers = useSelector(
    (state: RootState) => state.favoriteBeer.abcBeers,
  );
  const recentBeers = useSelector(
    (state: RootState) => state.favoriteBeer.recentBeers,
  );

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

  const reviewBeers = useSelector((state: RootState) => state.reviewBeer.beers);

  function setReviewBeers(beers: BeerT[]) {
    dispatch({ type: BEER_REVIEW, beers });
  }
  useEffect(() => {
    axios
      .post<BeerT[]>(`https://beer4.xyz/comment/mylist`, { token: token })
      .then((res) => {
        // console.log(res.data);
        setReviewBeers(res.data);
      });
  }, []);

  return (
    <MobileMyBeer
      abcBeers={abcBeers}
      reviewBeers={reviewBeers}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const MobileMyBeerContainerWithRouter = withRouter(
  MobileMyBeerContainer,
);
