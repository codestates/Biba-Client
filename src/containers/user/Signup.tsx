import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Signup } from '../../components/user/Signup';
import { emailCheck, nicknameCheck, checkInput } from './utils';
import { RootState } from '../../modules';
import { InputWithCheck, Input, CheckBtn } from '../../components/user/Signup';

export interface SignupProps {
  mapInputList(): JSX.Element[];
  handleClickSignup(): void;
  handleCheckAge(): void;
  ageConfirm: boolean;
}

const SignupContainer = (): JSX.Element => {
  const emailConfirm = useSelector(
    (state: RootState) => state.confirmEmail.value,
  );
  const nicknameConfirm = useSelector(
    (state: RootState) => state.confirmNickname.value,
  );
  const ageConfirm = useSelector((state: RootState) => state.confirmAge.value);
  const btnColor = useSelector((state: RootState) => state.btnColor.btn);
  const textColor = useSelector((state: RootState) => state.btnColor.text);

  const dispatch = useDispatch();
  const handleConfirmEmail = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_EMAIL', value });
  };
  const handleConfirmNickname = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_NICKNAME', value });
  };
  const handleConfirmAge = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_AGE', value });
  };
  const handleBtnColor = (btn: string, text: string): void => {
    dispatch({ type: 'SET_BTNCOLOR', btn, text });
  };

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    passwordForCheck: '',
    nickname: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (emailConfirm && e.currentTarget.name === 'email') {
      handleConfirmEmail(false);
    }
    if (nicknameConfirm && e.currentTarget.name === 'nickname') {
      handleConfirmNickname(false);
    }
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleCheckEmail = (): void => {
    if (inputValues.email !== '') {
      if (emailCheck(inputValues.email)) {
        axios
          .post('http://localhost:4000/users/emailconfirm', {
            email: inputValues.email,
          })
          .then((res) => {
            if (res.status === 200) alert(`사용 가능한 이메일입니다.`);
            // 중복 확인 버튼 변화 && confirm dispatch
            handleBtnColor('#989898', 'lightgrey');
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
            if (res.status === 200) alert(`사용 가능한 닉네임입니다.`);
            // 중복 확인 버튼 변화 && confirm dispatch
            handleBtnColor('#989898', 'lightgrey');
            handleConfirmNickname(true);
          })
          .catch(() => {
            alert(`이미 존재하는 닉네임입니다.\n다른 닉네임을 사용해주세요.`);
            handleBtnColor('#989898', 'lightgrey'); // 임시
            handleConfirmNickname(true); // 임시
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

  const handleCheckAge = (): void => {
    handleConfirmAge(!ageConfirm);
  };

  const handleClickSignup = (): void => {
    const { email, password, passwordForCheck, nickname } = inputValues;
    console.log('test');
    if (emailConfirm && nicknameConfirm) {
      checkInput(email, password, passwordForCheck, nickname);
      console.log(ageConfirm);
      // checkInput, ageConfirm이 true라면 post 요청(가입 요청 전송)
    }
    if (!emailConfirm) {
      if (inputValues.email !== '') {
        return alert(`이메일 중복 확인을 해주세요.`);
      } else {
        return alert(`이메일 주소를 입력해주세요.`);
      }
    }
    if (!nicknameConfirm) {
      if (inputValues.nickname !== '') {
        return alert(`닉네임 중복 확인을 해주세요.`);
      } else {
        return alert(`닉네임을 입력해주세요.`);
      }
    }
  };

  const inputList: string[][] = [
    ['email', '이메일을 입력해주세요.'],
    ['nickname', '닉네임을 입력해주세요.'],
    ['password', '비밀번호를 입력해주세요.'],
    ['passwordForCheck', '다시 한번 입력해주세요.'],
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
            style={
              inputList.indexOf(ele) === 0
                ? emailConfirm
                  ? { background: btnColor, color: textColor }
                  : {}
                : nicknameConfirm
                ? { background: btnColor, color: textColor }
                : {}
            }
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

  return (
    <Signup
      mapInputList={mapInputList}
      handleClickSignup={handleClickSignup}
      handleCheckAge={handleCheckAge}
      ageConfirm={ageConfirm}
    />
  );
};

export const SignupContainerWithRouter = withRouter(SignupContainer);
