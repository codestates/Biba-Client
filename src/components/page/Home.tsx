import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Route, RouterProps, Switch } from 'react-router';
import { RootState } from '../../modules';

import { TodayBeerListContainerWithRouter } from '../../containers/list/TodayBeerListContainer';
import { WantSomeBeerListContainerWithRouter } from '../../containers/list/WantSomeBeerListContainer';

export interface HomeProps {
  props: RouterProps;
}

function Home({ props }: HomeProps): JSX.Element {
  const { isLogin } = useSelector((state: RootState) => state.login);
  return (
    <Container>
      <Switch>
        <Route
          path='/wantsomebeer'
          component={WantSomeBeerListContainerWithRouter}
        />
        {/* {isLogin ? (
            <Route path='/mybeer' component={MybeerContainerWithRouter} />
          ) : (
            false
          )} */}
        <Route exact path='/' component={TodayBeerListContainerWithRouter} />
      </Switch>
    </Container>
  );
}

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
