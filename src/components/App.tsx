import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';

import { HomeContainerWithRouter } from '../containers/page/HomeContainer';
import { NavContainerWithRouter } from '../containers/nav/Nav';
import { BeerListNavContainerWithRouter } from '../containers/nav/BeerListNavContainer';
import { ModalContainerWithRouter } from '../containers/nav/Modal';
import { LoginContainerWithRouter } from '../containers/user/Login';
import { SignupContainerWithRouter } from '../containers/user/Signup';
import { MypageContainerWithRouter } from '../containers/user/Mypage';
import { FooterContainerithRouter } from '../containers/nav/Footer';
import { BeerDetailWithRouter } from '../containers/page/BeerDetailContainer';

import { RootState } from '../modules';

export const App = ({
  match,
  history,
  location,
}: RouteComponentProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const handleNavDisplay = (display: boolean) => {
    dispatch({ type: 'SET_NAVDISPLAY', display });
  };

  const whiteList = ['login', 'signup', 'beer'];
  const fullList = ['/login', '/signup', '/mypage'];
  useEffect(() => {
    fullList.indexOf(location.pathname) !== -1
      ? handleNavDisplay(false)
      : handleNavDisplay(true);
  });
  return (
    <Container>
      <Nav>
        <Route component={NavContainerWithRouter} />
        <Route component={ModalContainerWithRouter} />
      </Nav>
      <Main>
        <Side>
          <Route component={BeerListNavContainerWithRouter} />
        </Side>
        <Full>
          <Switch>
            <Route path='/login' component={LoginContainerWithRouter} />
            <Route path='/signup' component={SignupContainerWithRouter} />
            {isLogin ? (
              <Route path='/mypage' component={MypageContainerWithRouter} />
            ) : (
              false
            )}
          </Switch>
        </Full>
        <Half>
          <Switch>
            <Route path='/beer/:beerId' component={BeerDetailWithRouter} />
            <Route exact path='/' component={HomeContainerWithRouter} />
          </Switch>
          {whiteList.indexOf(location.pathname.split('/')[1]) === -1 ? (
            <Redirect to='/' path='*' />
          ) : (
            false
          )}
        </Half>
      </Main>
      <Footer>
        <Route component={FooterContainerithRouter} />
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 1em auto auto auto 1em;
  grid-template-columns: auto 86% auto;
  grid-template-areas:
    '. . .'
    '. Nav .'
    '. Main .'
    '. Footer .'
    '. . .';
`;

const Nav = styled.div`
  grid-area: Nav;
`;

const Main = styled.div`
  display: grid;
  grid-area: Main;
  grid-template-columns: 15em auto;
`;

const Side = styled.div`
  grid-area: Main;
  grid-column: 1 / 2;
`;

const Full = styled.div`
  grid-area: Main;
  grid-column: 1 / 3;
`;

const Half = styled.div`
  grid-area: Main;
  grid-column: 2 / 3;
`;

const Footer = styled.div`
  grid-area: Footer;
`;
