import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { Signup } from '../../components/user/Signup';
import { checkInput } from './utils';
import { InputWithCheck, Input, CheckBtn } from '../../components/user/Signup';

export interface SignupProps {
  mapInputList(): JSX.Element[];
  handleSignup(): void;
}

const SignupContainer = (): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    checkpw: '',
    username: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSignup = (): void => {
    const { email, password, checkpw, username } = inputValues;
    checkInput(email, password, checkpw, username);
    console.log('test');
  };

  const inputList: string[][] = [
    ['email', '이메일을 입력해주세요.'],
    ['username', '닉네임을 입력해주세요.'],
    ['password', '비밀번호를 입력해주세요.'],
    ['checkpw', '다시 한번 입력해주세요.'],
  ];
  const mapInputList = (): JSX.Element[] => {
    return inputList.map((ele) =>
      inputList.indexOf(ele) === 0 || inputList.indexOf(ele) === 1 ? (
        <InputWithCheck key={`inputList${inputList.indexOf(ele)}`}>
          <Input
            type='text'
            name={ele[0]}
            onChange={handleOnChange}
            placeholder={ele[1]}
          ></Input>
          <CheckBtn className='checkBtn'>중복 확인</CheckBtn>
        </InputWithCheck>
      ) : (
        <Input
          key={`inputList${inputList.indexOf(ele)}`}
          type='password'
          name={ele[0]}
          onChange={handleOnChange}
          placeholder={ele[1]}
        ></Input>
      ),
    );
  };

  return <Signup mapInputList={mapInputList} handleSignup={handleSignup} />;
};

export const SignupContainerWithRouter = withRouter(SignupContainer);
