import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../components/page/Home';
import { NavContainerWithRouter } from '../containers/nav/Nav';
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
        <Route exact path='/' component={Home} />
        <Redirect to='/' path='*' />
      </Switch>
    </>
  );
};
