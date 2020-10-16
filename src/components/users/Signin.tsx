import React from 'react';
import styled from 'styled-components';

import { SigninProps } from '../../containers/Signin';

export const Signin = ({
  setSignin,
  handleOnChange,
  handleSignin,
}: SigninProps): JSX.Element => {
  return (
    <Container>
      <SigninArea className='signinArea'>
        <Title className='signinTitle'>
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
          <SigninBtn className='signinBtn' onClick={handleSignin}>
            로그인
          </SigninBtn>
        </InputArea>
        <BtnArea className='btnArea'>
          <SocialBtn className='googleLoginBtn'>구글 로그인</SocialBtn>
          <SocialBtn className='kakaoLoginBtn'>카카오 로그인</SocialBtn>
        </BtnArea>
      </SigninArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SigninArea = styled.div`
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

const SigninBtn = styled.button`
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
