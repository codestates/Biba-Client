import React from 'react';
// import { Route, Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Axios from 'axios';

// import Search from '../containers/Search';

import { RootState } from '../../modules';

interface LoginInput {
  email: string;
  password: string;
}

export const Signin = (initialState: LoginInput): JSX.Element => {
  const signin = useSelector((state: RootState) => state.signin);
  const dispatch = useDispatch();

  return (
    <div className='loginArea'>
      <div className='loginTitle'>로그인 안내 문구</div>
      <div className='inputArea'>
        <input type='text' placeholder='이메일을 입력해주세요.'></input>
        <input type='text' placeholder='비밀번호를 입력해주세요.'></input>
        <button className='loginBtn'>로그인</button>
      </div>
      <div className='btnArea'>
        <button className='googleLoginBtn'>구글 로그인</button>
        <button className='kakaoLoginBtn'>카카오 로그인</button>
      </div>
    </div>
  );
};
