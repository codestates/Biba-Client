import React from 'react';
import styled from 'styled-components';

import { LoginProps } from '../../containers/user/Login';

export const Login = ({
  handleOnChange,
  handleLogin,
  pressEnter,
  redirectToSignup,
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
            onKeyPress={pressEnter}
            placeholder='이메일을 입력해주세요.'
          ></Input>
          <Input
            type='password'
            name='password'
            onChange={handleOnChange}
            onKeyPress={pressEnter}
            placeholder='비밀번호를 입력해주세요.'
          ></Input>
        </InputArea>
        <BtnArea className='btnArea'>
          <SmallBtn className='loginBtn' onClick={handleLogin}>
            로그인
          </SmallBtn>
          <LongBtn className='googleLoginBtn'>구글 로그인</LongBtn>
          <LongBtn className='kakaoLoginBtn'>카카오 로그인</LongBtn>
          <Redirect className='signupBtn' onClick={redirectToSignup}>
            Biba 가입하러 가기
          </Redirect>
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

const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 15em;
`;

const SmallBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
  width: 5em;

  margin: 0.15em 0 0.3em 0;
`;

const LongBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
  width: 10em;

  margin: 0.15em 0 0.15em 0;
`;

const Redirect = styled.div`
  cursor: pointer;

  display: flex;
  align-self: center;

  margin: 1.5em 0 0 0;
`;
