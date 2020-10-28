import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { App } from '../components/App';
import { RootState } from '../modules';

export interface AppProps extends RouteComponentProps {
  isLogin: boolean;
  whiteList: string[];
}

export const AppContainer = ({
  match,
  history,
  location,
}: RouteComponentProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const handleNavDisplay = (display: boolean) => {
    dispatch({ type: 'SET_NAVDISPLAY', display });
  };
  const handleConfirmEmail = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_EMAIL', value });
  };
  const handleConfirmNickname = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_NICKNAME', value });
  };
  const handleConfirmAge = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_AGE', value });
  };
  const handleConfirms = (): void => {
    handleConfirmEmail(false);
    handleConfirmNickname(false);
    handleConfirmAge(false);
  };

  const whiteList = ['login', 'signup', 'beer']; // 최종 때는 beer 빼는 걸로
  const fullList = ['/login', '/signup', '/mypage'];
  useEffect(() => {
    fullList.indexOf(location.pathname) !== -1
      ? handleNavDisplay(false)
      : handleNavDisplay(true);
  });
  useEffect(() => {
    return location.pathname === 'signup' || location.pathname === 'mypage'
      ? undefined
      : handleConfirms();
  });
  return (
    <App
      match={match}
      history={history}
      location={location}
      isLogin={isLogin}
      whiteList={whiteList}
    />
  );
};

export const AppContainerWithRouter = withRouter(AppContainer);
