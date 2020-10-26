import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import ReviewList from '../../components/list/ReviewBeerList';
import axios from 'axios';
import { BeerT, BEER_REVIEW } from '../../modules/getbeers';

import { HomeProps } from '../../containers/page/HomeContainer';

function ReviewListContainer(): JSX.Element {
  const reviewBeerList = useSelector(
    (state: RootState) => state.reviewBeer.beers,
  );
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setReviewBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_REVIEW, beers });
  };

  useEffect(() => {
    axios.get<BeerT[]>(`https://beer4.xyz/beer/list`).then((res) => {
      // 임시
      setReviewBeers(res.data);
    });
  }, [setReviewBeers]);
  return <ReviewList beers={reviewBeerList} />;
}

export const ReviewListContainerWithRouter = withRouter(ReviewListContainer);
