import React, { useState } from 'react';
import { UserState, SetSigninAction } from '../../modules/signin';

import axios from 'axios';

export interface Props {
  userData: {
    id: number;
    username: string;
  };
  isSignin: boolean;
  token: string;
  setSignin: (
    data: { id: number; username: string },
    state: boolean,
    token: string,
  ) => SetSigninAction;
}

export const Signin = ({ setSignin }: Props): JSX.Element => {
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
    <div className='loginArea'>
      <div className='loginTitle'>
        Biba!
        <br />
        Sign in
      </div>
      <div className='inputArea'>
        <input
          type='text'
          name='email'
          onChange={handleOnChange}
          placeholder='이메일을 입력해주세요.'
        ></input>
        <input
          type='password'
          name='password'
          onChange={handleOnChange}
          placeholder='비밀번호를 입력해주세요.'
        ></input>
        <button className='loginBtn' onClick={handleSignin}>
          로그인
        </button>
      </div>
      <div className='btnArea'>
        <button className='googleLoginBtn'>구글 로그인</button>
        <button className='kakaoLoginBtn'>카카오 로그인</button>
      </div>
    </div>
  );
};
