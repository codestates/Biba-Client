import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Route, RouterProps } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../modules';

import { TodayBeerListContainerWithRouter } from '../../containers/list/TodayBeerListContainer';
import { WantSomeBeerListContainerWithRouter } from '../../containers/list/WantSomeBeerListContainer';

import { HomeProps } from '../../containers/page/HomeContainer';
import { MyBeerContainerWithRouter } from '../../containers/page/MyBeerContainer';
import { SearchBeerListContainerWithRouter } from '../../containers/list/SearchBeerListContainer';

function Home({
  match,
  history,
  location,
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const isToday = useSelector((state: RootState) => state.changePage.isToday);
  const isWant = useSelector((state: RootState) => state.changePage.isWant);
  const isMy = useSelector((state: RootState) => state.changePage.isMy);
  const isSearch = useSelector((state: RootState) => state.changePage.isSearch);
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
      {isMy ? <MyBeerContainerWithRouter /> : false}
      {isSearch ? (
        <SearchBeerListContainerWithRouter
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
  // position: absolute;
  right: 0;
  top: 0;
  // width: 80%;
  max-width: 1050px;
  min-height: 650px;
  margin: 1em auto;
`;

export default Home;
