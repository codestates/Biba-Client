import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Login } from '../../components/user/Login';
import { UserState, UserProfile } from '../../modules/user';

interface LoginResponse extends UserState, UserProfile {}
export interface LoginProps {
  props: RouterProps;
  setSearchBar(iconDisplay: boolean, barDisplay: boolean): void;
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleLogin(): void;
}

const LoginContainer = (props: RouterProps): JSX.Element => {
  const dispatch = useDispatch();
  const setLogin = (
    userData: { id: number; username: string },
    isLogin: boolean,
    token: string,
  ) => {
    dispatch({ type: 'SET_LOGINSTATE', userData, isLogin, token });
  };
  const setProfile = (profile: string) => {
    dispatch({ type: 'SET_PROFILE', profile });
  };
  const setSearchBar = (iconDisplay: boolean, barDisplay: boolean): void => {
    dispatch({ type: 'SET_SARCHBAR', iconDisplay, barDisplay });
  };

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleLogin = (): void => {
    axios
      .post<LoginResponse>('http://localhost:4000/users/login', {
        // 임시 주소
        email: inputValues.email,
        password: String(inputValues.password),
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const { id, username } = res.data.userData;
          const { token, profile } = res.data;
          setLogin({ id: id, username: username }, true, token);
          setProfile(profile);
        }
      })
      .catch(() => alert('입력한 정보를 다시 한번 확인해주세요.'));
  };

  return (
    <Login
      props={props}
      setSearchBar={setSearchBar}
      handleOnChange={handleOnChange}
      handleLogin={handleLogin}
    />
  );
};

export const LoginContainerWithRouter = withRouter(LoginContainer);
