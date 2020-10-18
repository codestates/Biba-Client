import React from 'react';
import styled from 'styled-components';

import { LoginProps } from '../../containers/Login';

export const Login = ({
  setLogin,
  handleOnChange,
  handleLogin,
}: LoginProps): JSX.Element => {
  return (
    <Container>
      <LoginArea className='loginArea'>
        <Title className='loginTitle'>
          Biba!
          <br />
          Sign in
        </Title>
        <InputArea className='inputArea'>
          <Input
            type='text'
            name='email'
            onChange={handleOnChange}
            placeholder='이메일을 입력해주세요.'
          ></Input>
          <Input
            type='password'
            name='password'
            onChange={handleOnChange}
            placeholder='비밀번호를 입력해주세요.'
          ></Input>
          <LoginBtn className='loginBtn' onClick={handleLogin}>
            로그인
          </LoginBtn>
        </InputArea>
        <BtnArea className='btnArea'>
          <SocialBtn className='googleLoginBtn'>구글 로그인</SocialBtn>
          <SocialBtn className='kakaoLoginBtn'>카카오 로그인</SocialBtn>
        </BtnArea>
      </LoginArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginArea = styled.div`
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

const Input = styled.input`
  display: flex;
  width: 13em;
`;

const LoginBtn = styled.button`
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
  width: 10em;

  margin: 0.15em 0 0.15em 0;
`;
