import React, { useState } from 'react';
import styled from 'styled-components';

import { checkInput } from './utils';

import axios from 'axios';

export const Signup = (): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    checkpw: '',
    username: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  return (
    <Container>
      <SignupArea className='signupArea'>
        <Title className='signupTitle'>
          Biba!
          <br />
          Sign up
        </Title>

        <InputArea className='inputArea'>
          {mapInputList()}
          <SignupBtn className='signupBtn' onClick={handleSignup}>
            회원가입
          </SignupBtn>
        </InputArea>
        <BtnArea className='btnArea'>
          <SocialBtn className='googleSignupBtn'>
            구글 아이디로 회원가입
          </SocialBtn>
          <SocialBtn className='kakaoSignupBtn'>
            카카오 아이디로 회원가입
          </SocialBtn>
        </BtnArea>
      </SignupArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SignupArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 2px solid #545454;

  width: 65em;
  padding: 1em 0 2em 0;
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.7em;
  font-weight: bold;

  width: 10em;
  margin: 0.5em 0 0.5em 0;
`;

const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  margin: 0.5em 0 0.5em 0;
`;

const InputWithCheck = styled.div`
  display: flex;

  margin: 0 0 0.1em 0;
`;

const Input = styled.input`
  display: flex;

  width: 13em;
  height: 24px;

  margin: 0 0 0.1em 0;
`;

const CheckBtn = styled.button`
  font-size: 0.85em;

  height: 24px;

  margin: 0;
`;

const SignupBtn = styled.button`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 5em;

  margin: 0.5em 0 0.3em 0;
`;

const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 15em;
`;

const SocialBtn = styled.button`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 12em;

  margin: 0.15em 0 0.15em 0;
`;
