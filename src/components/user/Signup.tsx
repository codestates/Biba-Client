import React from 'react';
import styled from 'styled-components';

import { SignupProps } from '../../containers/user/SignupContainer';
import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  lightGrey1,
  lightGrey2,
  btnOff,
  btnOffText,
  pDefault,
} from '../../components/nav/color';

export const Signup = ({
  mapInputList,
  handleClickSignup,
  handleCheckAge,
  handleClickGoogleSignup,
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
              id='checkAge'
              type='checkbox'
              onChange={handleCheckAge}
              checked={ageConfirm}
            ></CheckAge>
            <CheckAgeLabel htmlFor='checkAge'></CheckAgeLabel>
            <CheckAgeText onClick={handleCheckAge}>
              20세 이상입니다.
            </CheckAgeText>
          </CheckAgeArea>
          <SignupBtn className='signupBtn' onClick={handleClickSignup}>
            Biba! 회원가입
          </SignupBtn>
        </InputArea>
        <BtnArea className='btnArea'>
          <SocialBtn
            className='googleSignupBtn'
            onClick={handleClickGoogleSignup}
          >
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
  justify-content: center;

  width: 500px;
  height: 520px;

  border: 2px solid ${mainYellowOpac};
  border-radius: 8px;

  margin: 1.5em 0 4em 0;
  padding: 2em 0 2.5em 0;

  // background-color: ${mainYellowOpac};
`;

const Title = styled.div`
  display: flex;
  justify-content: center;

  width: 70%;
  margin: 0.5em 0 0.5em 0;
  font-size: 1.7em;
  font-weight: bold;
`;

const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  margin: 0.5em 0 0.5em 0;
`;

export const InputWithCheck = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  display: flex;

  border: 0px solid ${mainYellow};
  border-radius: 8px;
  width: 15em;

  margin: 0 0.6em 0.5em 0.6em;
  padding: 0.4em 0.5em 0.3em 0.5em;

  font-size: 0.95em;
  line-height: 1.5;
  background-color: ${lightGrey2};
  &:focus {
    outline: none;
  }
`;

export const CheckBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;

  margin: 0 0 0.5em 0;
  padding: 0.55em 0.6em 0.45em 0.6em;

  font-size: 0.85em;
  // font-weight: 300;
  background-color: ${mainYellow};
  color: #fff;

  &:hover {
    background-color: ${mainGrey};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

const CheckAgeArea = styled.div`
  display: flex;

  margin: 0.5em 0 1em 1em;
`;
const CheckAge = styled.input`
  cursor: pointer;
  display: none;

  &:checked + label {
    background-color: ${mainYellow};
    border: 0px;
  }
  &:focus {
    outline: none;
  }
`;
const CheckAgeLabel = styled.label`
  cursor: pointer;
  width: 16px;
  height: 16px;
  border: 1.5px solid ${mainGrey};
`;
const CheckAgeText = styled.p`
  cursor: pointer;

  margin: 0.1em 0 0 0.35em;
  padding: 0;
`;

const SignupBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
  width: 12em;

  border: 0.5px solid white;
  border-radius: 8px;

  margin: 0.7em 0 0 0;
  padding: 0.525em 0.6em 0.425em 0.6em;

  font-size: 1em;
  // font-weight: 300;
  background-color: ${mainYellow};
  color: #fff;

  &:hover {
    background-color: ${mainGrey};
    color: white;
  }
  &:focus {
    outline: none;
  }
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

  border: 2px solid ${mainYellowOpac};
  border-radius: 8px;

  margin: 0.15em 0 0.3em 0;
  padding: 0.5em 0.6em 0.4em 0.6em;

  font-size: 1em;
  font-weight: 500;
  // background-color: ${mainYellow};
  // color: #fff;
  background-color: #fff;
  color: ${mainGrey};

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0);
    font-weight: 400;
    background-color: ${mainGrey};
    color: #fff;
  }
  &:focus {
    outline: none;
  }
`;
