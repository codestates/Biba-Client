import React from 'react';
import { useDispatch } from 'react-redux';

import { Signin } from '../components/users/Signin';

export const SigninContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const setSignin = (
    userData: { id: number; username: string },
    isSignin: boolean,
    token: string,
  ) => {
    dispatch(setSignin(userData, isSignin, token));
  };

  return <Signin setSignin={setSignin} />;
};
