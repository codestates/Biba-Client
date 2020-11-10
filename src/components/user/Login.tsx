import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { LoginProps } from '../../containers/user/LoginContainer';
import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';

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

export const Login = ({
  inputValues,
  handleOnChange,
  handleLogin,
  handleGoogleLogin,
  pressEnter,
  redirectToSignup,
}: LoginProps): JSX.Element => {
  const { contentType, display } = useSelector(
    (state: RootState) => state.modal,
  );
  const innerContent = (): JSX.Element => {
    return (
      <>
        <Title className='loginTitle'>
          Biba!
          <br />
          Login
        </Title>
        <InputArea className='inputArea'>
          <Input
            type='text'
            name='email'
            value={inputValues.email}
            onChange={handleOnChange}
            onKeyPress={pressEnter}
            placeholder='이메일을 입력해주세요.'
          ></Input>
          <Input
            type='password'
            name='password'
            value={inputValues.password}
            onChange={handleOnChange}
            onKeyPress={pressEnter}
            placeholder='비밀번호를 입력해주세요.'
          ></Input>
        </InputArea>
        <BtnArea className='btnArea'>
          <SmallBtn className='loginBtn' onClick={handleLogin}>
            로그인
          </SmallBtn>
          {/* <LongBtn className='googleLoginBtn' onClick={handleGoogleLogin}>
            구글 로그인
          </LongBtn>
          <LongBtn className='kakaoLoginBtn'>카카오 로그인</LongBtn> */}
          <Redirect className='signupBtn' onClick={redirectToSignup}>
            Biba 가입하러 가기
          </Redirect>
        </BtnArea>
      </>
    );
  };
  return (
    <Container>
      {display !== true ? (
        <LoginArea className='loginArea'>{innerContent()}</LoginArea>
      ) : (
        <ModalLoginArea>{innerContent()}</ModalLoginArea>
      )}
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

  width: 400px;
  // height: 520px;

  border: 2px solid ${mainYellowOpac};
  border-radius: 8px;

  margin: 3em 0 4em 0;
  padding: 1.8em 0 2.6em 0;

  // background-color: ${mainYellowOpac};
  @media (max-width: 768px) {
    width: 70vw;
    border: 0;
    margin: 2em 0 0 0;
  }
`;

const ModalLoginArea = styled(LoginArea)`
  margin: 0 0 2.2em 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;

  width: 70%;
  margin: 0.5em 0 0.5em 0;
  font-size: 1.7em;
  font-weight: bold;
  color: ${mainGrey};
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  margin: 0.5em 0 0.5em 0;
`;

const Input = styled.input`
  display: flex;

  border: 0px solid ${mainYellow};
  border-radius: 8px;
  width: 15em;

  margin: 0 0.8em 0.5em 0.6em;
  padding: 0.4em 0.5em 0.3em 0.5em;

  font-size: 0.95em;
  line-height: 1.5;
  background-color: ${lightGrey1};
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 0.9em;
  }
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
  width: 10em;
  border: 0.5px solid white;
  border-radius: 8px;

  margin: 0.8em 0 0 0;
  padding: 0.6em 0.6em 0.55em 0.6em;

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

const LongBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
  width: 10em;

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

const Redirect = styled.div`
  cursor: pointer;

  display: flex;
  align-self: center;

  margin: 1.8em 0 0 0;

  text-decoration: underline;
  font-size: 1.05em;
  font-weight: 500;
  color: ${mainYellow};
  &:hover {
    color: ${mainGrey};
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 0.95em;
  }
`;
