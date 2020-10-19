import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Route, RouterProps } from 'react-router';
import { RootState } from '../../modules';

import { TodayBeerListContainerWithRouter } from '../../containers/list/TodayBeerListContainer';
import { WantSomeBeerListContainerWithRouter } from '../../containers/list/WantSomeBeerListContainer';
import { BeerListNavContainerWithRouter } from '../../containers/nav/BeerListNavContainer';

export interface HomeProps {
  props: RouterProps;
}

function Home({ props }: HomeProps): JSX.Element {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const isToday = useSelector((state: RootState) => state.changepage.isToday);
  const isWant = useSelector((state: RootState) => state.changepage.isWant);
  const isMy = useSelector((state: RootState) => state.changepage.isMy);
  return (
    <MainContainer>
      <BeerListNavContainerWithRouter />
      <Container>
        {isToday ? <TodayBeerListContainerWithRouter /> : false}
        {isWant ? <WantSomeBeerListContainerWithRouter /> : false}
        {isMy ? true : false}
      </Container>
    </MainContainer>
  );
}
const MainContainer = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;
`;

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  border: solid 2px gray;
`;

export default Home;
