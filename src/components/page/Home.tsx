import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

import { TodayBeerListContainerWithRouter } from '../../containers/list/TodayBeerListContainer';
import { WantSomeBeerListContainerWithRouter } from '../../containers/list/WantSomeBeerListContainer';
import { FavoriteBeerListContainerWithRouter } from '../../containers/list/FavoriteListContainer';
import { ReviewListContainerWithRouter } from '../../containers/list/ReviewListContainer';

import { HomeProps } from '../../containers/page/HomeContainer';
import { SearchBeerListContainerWithRouter } from '../../containers/list/SearchBeerListContainer';
import { MobileMyBeerContainerWithRouter } from '../../containers/mobile/MobileMyBeerContainer';
import { MobileSearchContainerWithRouter } from '../../containers/mobile/MobileSearchContainer';

function Home({
  match,
  history,
  location,
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const isToday = useSelector((state: RootState) => state.changePage.isToday);
  const isWant = useSelector((state: RootState) => state.changePage.isWant);
  const isFavorite = useSelector(
    (state: RootState) => state.changePage.isFavorite,
  );
  const isReview = useSelector((state: RootState) => state.changePage.isReview);
  const isSearch = useSelector((state: RootState) => state.changePage.isSearch);
  const isSearchM = useSelector(
    (state: RootState) => state.changePage.isSearchM,
  );
  const isMyBeer = useSelector(
    (state: RootState) => state.changePage.isMybeerM,
  );

  return (
    <Container>
      {isToday ? (
        <TodayBeerListContainerWithRouter
          setBeerDetail={setBeerDetail}
          setAllReviews={setAllReviews}
        />
      ) : (
        false
      )}
      {isWant ? (
        <WantSomeBeerListContainerWithRouter
          setBeerDetail={setBeerDetail}
          setAllReviews={setAllReviews}
        />
      ) : (
        false
      )}
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
      {isSearch ? (
        <SearchBeerListContainerWithRouter
          setBeerDetail={setBeerDetail}
          setAllReviews={setAllReviews}
        />
      ) : (
        false
      )}
      {isMyBeer ? (
        <MobileMyBeerContainerWithRouter
          setBeerDetail={setBeerDetail}
          setAllReviews={setAllReviews}
        />
      ) : (
        false
      )}
      {isSearchM ? (
        <MobileSearchContainerWithRouter
          setBeerDetail={setBeerDetail}
          setAllReviews={setAllReviews}
        />
      ) : (
        false
      )}
    </Container>
  );
}

const Container = styled.div`
  right: 0;
  top: 0;
  max-width: 1050px;
  min-height: 650px;
  margin: 1em auto;
  @media (max-width: 425px) {
    min-height: 0;
    margin: 0 0 3.5em 0;
    width: 84vw;
  }
  @media (max-width: 375px) {
    margin: 0 0 2.5em 0;
  }
`;

export default Home;
