import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProps, withRouter } from 'react-router-dom';
import axios from 'axios';

import { Signup } from '../../components/user/Signup';
import { emailCheck, nicknameCheck, checkInput } from './userUtils';
import { RootState } from '../../modules';
import { InputWithCheck, Input, CheckBtn } from '../../components/user/Signup';
import { DefaultProps } from '../../containers/page/HomeContainer';

export interface SignupProps {
  mapInputList(): JSX.Element[];
  handleClickSignup(): void;
  handleCheckAge(): void;
  handleClickGoogleSignup(): void;
  ageConfirm: boolean;
}

const confirmBtnColor = '#989898';
const confirmTextColor = 'lightGrey';

const SignupContainer = ({
  match,
  history,
  location,
}: DefaultProps): JSX.Element => {
  const emailConfirm = useSelector(
    (state: RootState) => state.confirmEmail.value,
  );
  const nicknameConfirm = useSelector(
    (state: RootState) => state.confirmNickname.value,
  );
  const ageConfirm = useSelector((state: RootState) => state.confirmAge.value);

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

  const inputInit = {
    email: '',
    password: '',
    passwordForCheck: '',
    nickname: '',
  };
  const [inputValues, setInputValues] = useState(inputInit);
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
          // .post('http://localhost:4000/users/checkemail', {
          .post('https://beer4.xyz/users/checkemail', {
            email: inputValues.email,
          })
          .then((res) => {
            if (res.status === 200) {
              alert(`사용 가능한 이메일입니다.`);
              handleConfirmEmail(true);
            }
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
          // .post('http://localhost:4000/users/checknickname', {
          .post('https://beer4.xyz/users/checknickname', {
            nickname: inputValues.nickname,
          })
          .then((res) => {
            if (res.status === 200) {
              alert(`사용 가능한 닉네임입니다.`);
              handleConfirmNickname(true);
            }
          })
          .catch(() => {
            alert(`이미 존재하는 닉네임입니다.\n다른 닉네임을 사용해주세요.`);
          });
      } else {
        alert(
          `닉네임을 확인해주세요.\n4~12자리의 한글, 영어 또는 숫자 조합이어야 합니다.`,
        );
      }
    } else {
      alert(`닉네임을 입력해주세요.`);
    }
  };

  const handleCheckAge = (): void => {
    if (!ageConfirm) {
      const result = global.confirm(
        '법적으로 음주가 가능한 20세 이상의 성인임을 확인합니다.',
      );
      if (result) {
        handleConfirmAge(true);
      } else {
        alert('Biba 서비스를 이용하실 수 없습니다.');
      }
    } else {
      handleConfirmAge(false);
    }
  };

  const handleClickSignup = (): void => {
    const { email, password, passwordForCheck, nickname } = inputValues;
    if (
      emailConfirm &&
      nicknameConfirm &&
      ageConfirm &&
      checkInput(email, password, passwordForCheck, nickname)
    ) {
      axios
        // .post(`http://localhost:4000/users/signup`, {
        .post(`https://beer4.xyz/users/signup`, {
          email: email,
          password: password,
          passwordForCheck: passwordForCheck,
          nickname: nickname,
        })
        .then((res) => {
          if (res.status === 200) {
            alert(`회원 가입이 완료되었습니다. Biba!`);
            handleConfirmEmail(false);
            handleConfirmNickname(false);
            handleConfirmAge(false);
            history.push('/');
          }
        })
        .catch(() => {
          alert(
            `회원가입에 실패했습니다. 입력하신 정보를 다시 한번 확인해주세요.`,
          );
        });
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
    if (!ageConfirm) {
      alert('20세 이상의 성인임을 확인해주세요.');
    }
  };

  const handleClickGoogleSignup = (): void => {
    // axios.get('https://beer4.xyz/auth/google').then((res) => console.log(res));
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
                  ? { background: confirmBtnColor, color: confirmTextColor }
                  : {}
                : nicknameConfirm
                ? { background: confirmBtnColor, color: confirmTextColor }
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
      handleClickGoogleSignup={handleClickGoogleSignup}
      ageConfirm={ageConfirm}
    />
  );
};

export const SignupContainerWithRouter = withRouter(SignupContainer);
