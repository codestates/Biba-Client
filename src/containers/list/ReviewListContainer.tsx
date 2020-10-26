/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import ReviewList from '../../components/list/ReviewBeerList';
import axios from 'axios';
import { BeerT, BEER_REVIEW } from '../../modules/getbeers';

function ReviewListContainer(): JSX.Element {
  const reviewBeerList = useSelector(
    (state: RootState) => state.reviewBeer.beers,
  );
  const { token } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  function setReviewBeers(beers: BeerT[]) {
    dispatch({ type: BEER_REVIEW, beers });
  }
  useEffect(() => {
    axios
      .post<BeerT[]>(`https://beer4.xyz/comment/mylist`, { token: token })
      .then((res) => {
        setReviewBeers(res.data);
      });
  }, []);

  return <ReviewList beers={reviewBeerList} />;
}

export const ReviewListContainerWithRouter = withRouter(ReviewListContainer);
