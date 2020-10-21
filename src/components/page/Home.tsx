import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Route, RouterProps } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../modules';

import { TodayBeerListContainerWithRouter } from '../../containers/list/TodayBeerListContainer';
import { WantSomeBeerListContainerWithRouter } from '../../containers/list/WantSomeBeerListContainer';
import { MyBeerContainerWithRouter } from '../../containers/page/MyBeerContainer';
import { SearchBeerListContainerWithRouter } from '../../containers/list/SearchBeerListContainer';
import { DefaultProps } from '../../containers/page/HomeContainer';

function Home({ match, history, location }: DefaultProps): JSX.Element {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const isToday = useSelector((state: RootState) => state.changePage.isToday);
  const isWant = useSelector((state: RootState) => state.changePage.isWant);
  const isMy = useSelector((state: RootState) => state.changePage.isMy);
  const isSearch = useSelector((state: RootState) => state.changePage.isSearch);
  return (
    <Container>
      {isToday ? <TodayBeerListContainerWithRouter /> : false}
      {isWant ? <WantSomeBeerListContainerWithRouter /> : false}
      {isMy ? <MyBeerContainerWithRouter /> : false}
      {isSearch ? <SearchBeerListContainerWithRouter /> : false}
    </Container>
  );
}

const Container = styled.div`
  // position: absolute;
  right: 0;
  top: 0;
  // width: 80%;
  height: 100vh;
  margin: 0 auto;
  border: solid 2px gray;
`;

export default Home;
