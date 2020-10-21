import React from 'react';
import styled from 'styled-components';

import { SignupProps } from '../../containers/user/SignupContainer';

export const Signup = ({
  mapInputList,
  handleClickSignup,
  handleCheckAge,
  ageConfirm,
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
          <CheckAgeArea>
            <CheckAge
              type='checkbox'
              onChange={handleCheckAge}
              checked={ageConfirm}
            ></CheckAge>
            20세 이상입니다.
          </CheckAgeArea>
          <SignupBtn className='signupBtn' onClick={handleClickSignup}>
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

  width: 100%;
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

export const InputWithCheck = styled.div`
  display: flex;

  margin: 0 0 0.1em 0;
`;

export const Input = styled.input`
  display: flex;

  width: 13em;
  height: 24px;

  margin: 0 0 0.1em 0;
`;

export const CheckBtn = styled.button`
  cursor: pointer;

  font-size: 0.85em;

  height: 24px;

  margin: 0;
`;

const CheckAgeArea = styled.div``;
const CheckAge = styled.input``;

const SignupBtn = styled.button`
  cursor: pointer;

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
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
  width: 12em;

  margin: 0.15em 0 0.15em 0;
`;
