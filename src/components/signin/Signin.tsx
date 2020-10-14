import React, { Dispatch, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { RootState } from '../../modules';
import { setSignin, SigninAction } from '../../modules/signin';

import axios from 'axios';

const mapStateToProps = (state: RootState) => ({
  ...state.signin,
});

const mapDispatchToProps = (dispatch: Dispatch<SigninAction>) => {
  return {
    setSignin: (
      id: string,
      username: string,
      state: boolean,
      token: string,
    ) => {
      console.log('signin');
      dispatch(setSignin({ id: String(id), username: username }, true, token));
    },
  };
};

const Signin = (): JSX.Element => {
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
      .post('https://devyeon.com/users/login', {
        // 임시 주소
        email: inputValues.email,
        password: String(inputValues.password),
      })
      .then((res) => {
        const { id, username } = res.data.userData;
        const { token } = res.data;
        console.log('=====');
        setSignin({ id: String(id), username: username }, true, token);
        console.log('end');
      });
  };

  return (
    <div className='loginArea'>
      <div className='loginTitle'>로그인 안내 문구</div>
      <div className='inputArea'>
        <input
          type='text'
          name='email'
          onChange={handleOnChange}
          placeholder='이메일을 입력해주세요.'
        ></input>
        <input
          type='text'
          name='password'
          onChange={handleOnChange}
          placeholder='비밀번호를 입력해주세요.'
        ></input>
        <button className='loginBtn' onClick={handleLogin}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
