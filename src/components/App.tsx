import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { HomeContainerWithRouter } from '../containers/page/HomeContainer';
import { NavContainerWithRouter } from '../containers/nav/Nav';
import { ModalContainerWithRouter } from '../containers/nav/Modal';
import { BeerListNavContainerWithRouter } from '../containers/nav/BeerListNavContainer';
import { LoginContainerWithRouter } from '../containers/user/Login';
import { SignupContainerWithRouter } from '../containers/user/Signup';
import { MypageContainerWithRouter } from '../containers/user/Mypage';
import { FooterContainerithRouter } from '../containers/nav/Footer';

import { RootState } from '../modules';
import { AppProps } from '../containers/App';

export const App = ({ props }: AppProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.login);

  return (
    <Container>
      <Nav>
        <Route component={NavContainerWithRouter} />
        <Route component={ModalContainerWithRouter} />
      </Nav>
      <Main>
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
  grid-template-columns: 1em auto 1em;
  grid-template-areas:
    '. . .'
    'Nav Nav Nav'
    'Main Main Main'
    'Footer Footer Footer'
    '. . .';
`;

const MainContainer = styled.div`
  position: relative;
  width: 65em;
  margin: 0 auto;
`;

const Nav = styled.div`
  grid-area: Nav;
`;

const Main = styled.div`
  grid-area: Main;
`;

const Footer = styled.div`
  grid-area: Footer;
`;
