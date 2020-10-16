import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Signin } from '../components/users/Signin';
import { UserState } from '../modules/signin';

export interface SigninProps {
  setSignin: (
    userData: { id: number; username: string },
    isSignin: boolean,
    token: string,
  ) => void;
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSignin(): void;
}

const SigninContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const setSignin = (
    userData: { id: number; username: string },
    isSignin: boolean,
    token: string,
  ) => {
    dispatch(setSignin(userData, isSignin, token));
  };

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSignin = (): void => {
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
          setSignin({ id: id, username: username }, true, token);
        }
      })
      .catch(() => alert('입력한 정보를 다시 한번 확인해주세요.'));
  };

  return (
    <Signin
      setSignin={setSignin}
      handleOnChange={handleOnChange}
      handleSignin={handleSignin}
    />
  );
};

export const SigninContainerWithRouter = withRouter(SigninContainer);
