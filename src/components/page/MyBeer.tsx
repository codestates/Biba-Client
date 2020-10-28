import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Route, RouterProps } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../modules';

import { FavoriteBeerListContainerWithRouter } from '../../containers/list/FavoriteListContainer';
import { ReviewListContainerWithRouter } from '../../containers/list/ReviewListContainer';

import { DefaultProps } from '../../containers/page/HomeContainer';

function MyBeer(): JSX.Element {
  const isFavorite = useSelector((state: RootState) => state.myBeer.isFavorite);
  const isReview = useSelector((state: RootState) => state.myBeer.isReview);

  return (
    <>
      {isFavorite ? <FavoriteBeerListContainerWithRouter /> : false}
      {isReview ? <ReviewListContainerWithRouter /> : false}
    </>
  );
}
export default MyBeer;
