import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Route, RouterProps } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../modules';

import { FavoriteBeerListContainerWithRouter } from '../../containers/list/FavoriteListContainer';
import { ReviewListContainerWithRouter } from '../../containers/list/ReviewListContainer';

import { HomeProps } from '../../containers/page/HomeContainer';

function MyBeer({ setBeerDetail, setAllReviews }: HomeProps): JSX.Element {
  const isFavorite = useSelector((state: RootState) => state.myBeer.isFavorite);
  const isReview = useSelector((state: RootState) => state.myBeer.isReview);

  return (
    <>
      {isFavorite ? (
        <FavoriteBeerListContainerWithRouter
          setBeerDetail={setBeerDetail}
          setAllReviews={setAllReviews}
        />
      ) : (
        false
      )}
      {isReview ? (
        <ReviewListContainerWithRouter
          setBeerDetail={setBeerDetail}
          setAllReviews={setAllReviews}
        />
      ) : (
        false
      )}
    </>
  );
}
export default MyBeer;
