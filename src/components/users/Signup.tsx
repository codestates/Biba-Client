import React, { useState } from 'react';
import styled from 'styled-components';

import { SignupProps } from '../../containers/Signup';

export const Signup = ({
  mapInputList,
  handleSignup,
}: SignupProps): JSX.Element => {
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
