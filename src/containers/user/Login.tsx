import React, { KeyboardEventHandler, SyntheticEvent, useState } from 'react';
import { RouterProps } from 'react-router';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Login } from '../../components/user/Login';
import { User, UserState, UserProfile } from '../../modules/user';

interface LoginResponse extends UserState, UserProfile {}
export interface LoginProps {
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleLogin(): void;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
}

const LoginContainer = (props: RouterProps): JSX.Element => {
  const dispatch = useDispatch();
  const setLogin = (userData: User, isLogin: boolean, token: string) => {
    dispatch({ type: 'SET_LOGINSTATE', userData, isLogin, token });
  };
  const setProfile = (profile: string) => {
    dispatch({ type: 'SET_PROFILE', profile });
  };
  const setSearchBar = (iconDisplay: boolean, barDisplay: boolean): void => {
    dispatch({ type: 'SET_SEARCHBAR', iconDisplay, barDisplay });
  };

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
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
        // console.log(res);
        if (res.status === 200) {
          const { id, nickname, email } = res.data.userData;
          const { token, profile } = res.data;
          // 받은 데이터로 store 상태 업데이트
          setLogin({ id: id, nickname: nickname, email: email }, true, token);
          setProfile(profile);
          setSearchBar(false, true);
          props.history.push('/');
        }
      })
      .catch(() => {
        console.log(props.history.location);
        alert('입력한 정보를 다시 한번 확인해주세요.');
      });
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <Login
      handleOnChange={handleOnChange}
      handleLogin={handleLogin}
      pressEnter={pressEnter}
    />
  );
};

export const LoginContainerWithRouter = withRouter(LoginContainer);
