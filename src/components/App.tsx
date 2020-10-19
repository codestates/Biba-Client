import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { HomeContainerWithRouter } from '../containers/page/HomeContainer';
import { NavContainerWithRouter } from '../containers/nav/Nav';
import { BeerListNavContainerWithRouter } from '../containers/nav/BeerListNavContainer';
import { LoginContainerWithRouter } from '../containers/user/Login';
import { SignupContainerWithRouter } from '../containers/user/Signup';
import { MypageContainerWithRouter } from '../containers/user/Mypage';

import { RootState } from '../modules';
import { AppProps } from '../containers/App';

export const App = ({ props }: AppProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.login);

  return (
    <>
      <Route
        path={['/login', '/signup', '/mypage']}
        component={NavContainerWithRouter}
      />

      <Route exact path='/' component={NavContainerWithRouter} />

      <Switch>
        <Route path='/login' component={LoginContainerWithRouter} />
        <Route path='/signup' component={SignupContainerWithRouter} />
        {isLogin ? (
          <Route path='/mypage' component={MypageContainerWithRouter} />
        ) : (
          false
        )}
        <MainContainer>
          <Route exact path='/' component={BeerListNavContainerWithRouter} />
          <Route exact path='/' component={HomeContainerWithRouter} />
        </MainContainer>
        <Redirect to='/' path='*' />
      </Switch>
    </>
  );
};

const MainContainer = styled.div`
  position: relative;
  width: 65em;
  margin: 0 auto;
`;
