import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { HomeContainerWithRouter } from '../containers/page/HomeContainer';
import { NavContainerWithRouter } from '../containers/nav/Nav';
import { BeerListNavContainerWithRouter } from '../containers/nav/BeerListNavContainer';
import { ModalContainerWithRouter } from '../containers/nav/Modal';
import { LoginContainerWithRouter } from '../containers/user/Login';
import { SignupContainerWithRouter } from '../containers/user/Signup';
import { MypageContainerWithRouter } from '../containers/user/Mypage';
import { FooterContainerithRouter } from '../containers/nav/Footer';
import { SearchBeerListContainerWithRouter } from '../containers/list/SearchBeerListContainer';
import { BeerDetailWithRouter } from '../containers/page/BeerDetailContainer';

import { AppProps } from '../containers/App';

export const App = ({
  match,
  history,
  location,
  isLogin,
  whiteList,
}: AppProps): JSX.Element => {
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
            //  || location.pathname.split('/').length !== 2 // 최종 때는 활성화
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
