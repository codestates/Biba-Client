import React, { KeyboardEventHandler, SyntheticEvent, useState } from 'react';
import { RouterProps } from 'react-router';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Login } from '../../components/user/Login';
import { User, UserState, UserProfile } from '../../modules/user';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews

interface LoginResponse extends UserState, UserProfile {}
export interface LoginProps {
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleLogin(): void;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
  redirectToSignup(): void;
}

export const LoginContainer = (props: RouterProps): JSX.Element => {
  const dispatch = useDispatch();
  const setLogin = (userData: User, isLogin: boolean, token: string) => {
    dispatch({ type: 'SET_LOGINSTATE', userData, isLogin, token });
  };
  const setProfile = (profile: string) => {
    dispatch({ type: 'SET_PROFILE', profile });
  };
  const handleModalClose = (
    contentType: ContentType,
    display: boolean,
  ): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const closeModal = (): void => {
    handleModalClose(ContentType.Empty, false);
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
      .post<LoginResponse>(`http://localhost:4000/users/login`, {
        // .post<LoginResponse>(`https://beer4.xyz/users/login`, {
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
          closeModal();
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
  const redirectToSignup = (): void => {
    closeModal();
    props.history.push('/signup');
  };

  return (
    <Login
      handleOnChange={handleOnChange}
      handleLogin={handleLogin}
      pressEnter={pressEnter}
      redirectToSignup={redirectToSignup}
    />
  );
};

export const LoginContainerWithRouter = withRouter(LoginContainer);
