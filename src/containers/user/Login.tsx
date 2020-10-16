import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Login } from '../../components/user/Login';
import { UserState } from '../../modules/user';

export interface LoginProps {
  setLogin: (
    userData: { id: number; username: string },
    isLogin: boolean,
    token: string,
  ) => void;
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleLogin(): void;
}

const LoginContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const setLogin = (
    userData: { id: number; username: string },
    isLogin: boolean,
    token: string,
  ) => {
    dispatch(setLogin(userData, isLogin, token));
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
      .post<UserState>('http://localhost:4000/users/login', {
        // 임시 주소
        email: inputValues.email,
        password: String(inputValues.password),
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const { id, username } = res.data.userData;
          const { token } = res.data;
          setLogin({ id: id, username: username }, true, token);
        }
      })
      .catch(() => alert('입력한 정보를 다시 한번 확인해주세요.'));
  };

  return (
    <Login
      setLogin={setLogin}
      handleOnChange={handleOnChange}
      handleLogin={handleLogin}
    />
  );
};

export const LoginContainerWithRouter = withRouter(LoginContainer);