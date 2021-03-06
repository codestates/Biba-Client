import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { HomeContainerWithRouter } from '../containers/page/HomeContainer';
import { NavContainerWithRouter } from '../containers/nav/NavContainer';
import { BeerListNavContainerWithRouter } from '../containers/nav/BeerListNavContainer';
import { FloatNavContainerWithRouter } from '../containers/nav/FloatNavContainer';
import { ModalContainerWithRouter } from '../containers/modal/ModalContainer';
import { LoginContainerWithRouter } from '../containers/user/LoginContainer';
import { SignupContainerWithRouter } from '../containers/user/SignupContainer';
import { MypageContainerWithRouter } from '../containers/user/MypageContainer';
import { FooterContainerithRouter } from '../containers/nav/FooterContainer';
import { BeerDetailWithRouter } from '../containers/page/BeerDetailContainer';
import ScrollToTop from '../components/page/ScrollToTop';

import { AppProps } from '../containers/AppContainer';

export const App = ({
  match,
  history,
  location,
  isLogin,
  whiteList,
}: AppProps): JSX.Element => {
  return (
    <Container className='appContainer'>
      <ScrollToTop>
        <Nav>
          <Route component={NavContainerWithRouter} />
          <Route component={ModalContainerWithRouter} />
        </Nav>
        <Main className='main'>
          <Side>
            <Route component={BeerListNavContainerWithRouter} />
          </Side>
          <Full>
            <Switch>
              <Route path='/login' component={LoginContainerWithRouter} />
              <Route path='/signup' component={SignupContainerWithRouter} />
              {isLogin ? (
                <Route path='/mypage' component={MypageContainerWithRouter} />
              ) : whiteList.indexOf(location.pathname) === -1 ? (
                <Redirect to='/' path='*' />
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
            {whiteList.indexOf(location.pathname) === -1 ? (
              <Redirect to='/' path='*' />
            ) : (
              false
            )}
          </Half>
          <Float>
            <Route component={FloatNavContainerWithRouter} />
          </Float>
        </Main>
        <Footer>
          <Route component={FooterContainerithRouter} />
        </Footer>
      </ScrollToTop>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 2.8em auto auto auto 3em;
  grid-template-columns: auto 80% auto;
  grid-template-areas:
    '. . .'
    '. Nav .'
    '. Main .'
    '. Footer .'
    '. . .';
  @media (max-width: 768px) {
    grid-template-rows: 1.5em auto auto auto 3em;
    grid-template-columns: auto 86% auto;
  }
`;

const Nav = styled.div`
  grid-area: Nav;
  width: 100%;
  margin: 0 0 2.2em 0;
  @media (max-width: 768px) {
    margin: 0 0 1em 0;
  }
  @media (max-width: 425px) {
    margin: 0 0 0.4em 0;
  }
`;

const Main = styled.div`
  display: grid;
  grid-area: Main;
  grid-template-columns: 15em auto;
  min-height: 600px;
  margin: 0 0 9em 0;
  @media (max-width: 768px) {
    margin: 0 0 4em 0;
  }
  @media (max-width: 425px) {
    margin: 0;
    min-height: 0;
  }
`;

const Side = styled.div`
  grid-area: Main;
  grid-column: 1 / 2;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Float = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    height: 8vh;
    width: 50%;
    z-index: 1;
    border-radius: 50px;
    background-color: white;
    box-shadow: 0.5px 0.5px 1px 1px rgba(50, 50, 50, 0.3);
    bottom: 5vh;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  @media (max-width: 425px) {
    display: block;
    position: fixed;
    height: 8vh;
    width: 65%;
    z-index: 1;
    border-radius: 50px;
    background-color: white;
    box-shadow: 0.5px 0.5px 1px 1px rgba(50, 50, 50, 0.3);
    bottom: 5vh;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
`;

const Full = styled.div`
  grid-area: Main;
  grid-column: 1 / 3;
  min-height: 640px;
  @media (max-width: 425px) {
    min-height: 0;
  }
`;

const Half = styled.div`
  grid-area: Main;
  grid-column: 2 / 3;
  animation: fadein 3s;
  -moz-animation: fadein 3s; /* Firefox */
  -webkit-animation: fadein 3s; /* Safari and Chrome */
  -o-animation: fadein 3s; /* Opera */
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 768px) {
    grid-area: Main;
    grid-column: 1 / 3;
    margin: 0 0 4em 0;
  }
  @media (max-width: 425px) {
    margin: 0;
  }
`;

const Footer = styled.div`
  grid-area: Footer;
  margin: 0 0 2em 0;
  @media (max-width: 768px) {
    display: none;
  }
`;
