import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { Signup } from '../../components/user/Signup';
import { emailCheck, nicknameCheck, checkInput } from './utils';
import { RootState } from '../../modules';
import { InputWithCheck, Input, CheckBtn } from '../../components/user/Signup';

export interface SignupProps {
  mapInputList(): JSX.Element[];
  handleSignup(): void;
}

const SignupContainer = (): JSX.Element => {
  const emailConfirm = useSelector(
    (state: RootState) => state.confirmEmail.value,
  );
  const nicknameConfirm = useSelector(
    (state: RootState) => state.confirmNickname.value,
  );

  const dispatch = useDispatch();
  const handleConfirmEmail = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_EMAIL', value });
  };
  const handleConfirmNickname = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_NICKNAME', value });
  };

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    checkpw: '',
    nickname: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (emailConfirm) {
      handleConfirmEmail(false);
    }
    if (nicknameConfirm) {
      handleConfirmEmail(false);
    }
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSignup = (): void => {
    const { email, password, checkpw, nickname } = inputValues;
    checkInput(email, password, checkpw, nickname);
    console.log('test');
  };

  const handleCheckEmail = (): void => {
    if (inputValues.email !== '') {
      if (emailCheck(inputValues.email)) {
        axios
          .post('http://localhost:4000/users/emailconfirm', {
            email: inputValues.email,
          })
          .then((res) => {
            if (res.status === 200) alert(`사용할 수 있는 이메일입니다.`);
            // 중복 확인 버튼 변화 && confirm dispatch
            handleConfirmEmail(true);
          })
          .catch(() => {
            alert(`이미 존재하는 이메일입니다.\n다른 이메일을 사용해주세요.`);
          });
      } else {
        alert(`정확한 이메일 주소를 입력해주세요.`);
      }
    } else {
      alert(`이메일 주소를 입력해주세요.`);
    }
  };
  const handleCheckNickname = (): void => {
    if (inputValues.nickname !== '') {
      if (nicknameCheck(inputValues.nickname)) {
        axios
          .post('http://localhost:4000/users/nicknameconfirm', {
            nickname: inputValues.nickname,
          })
          .then((res) => {
            if (res.status === 200) alert(`사용할 수 있는 닉네임입니다.`);
            // 중복 확인 버튼 변화 && confirm dispatch
            handleConfirmNickname(true);
          })
          .catch(() => {
            alert(`이미 존재하는 이메일입니다.\n다른 닉네임을 사용해주세요.`);
          });
      } else {
        alert(
          `닉네임을 확인해주세요.\n6~12자리의 영문, 숫자 조합이어야 합니다.`,
        );
      }
    } else {
      alert(`닉네임을 입력해주세요.`);
    }
  };

  const inputList: string[][] = [
    ['email', '이메일을 입력해주세요.'],
    ['nickname', '닉네임을 입력해주세요.'],
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
          <CheckBtn
            className='checkBtn'
            onClick={() => {
              inputList.indexOf(ele) === 0
                ? handleCheckEmail()
                : handleCheckNickname();
            }}
          >
            중복 확인
          </CheckBtn>
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
