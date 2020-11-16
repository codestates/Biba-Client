import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import { MDChangeNickname } from '../../components/modal/ChangeNickname';
import { RootState } from '../../modules';
import { nicknameCheck } from '../user/userUtils';
import { ModalContentProps } from './ModalContainer';

export interface MDNicknameChangeProps {
  nicknameConfirm: boolean;
  inputValues: {
    nickname: string;
  };
  handleNicknameOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleCheckNickname(): void;
  handleClickChangeNickname(): void;
}

export const MDChangeNicknameContainer = ({
  userData,
  isLogin,
  token,
  closeModal,
}: ModalContentProps): JSX.Element => {
  const nicknameConfirm = useSelector(
    (state: RootState) => state.confirmNickname.value,
  );
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    nickname: '',
  });
  const handleConfirmNickname = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_NICKNAME', value });
  };
  const handleNicknameOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();
    if (nicknameConfirm && e.currentTarget.name === 'nickname') {
      handleConfirmNickname(false);
    }
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleCheckNickname = (): void => {
    if (inputValues.nickname !== '') {
      if (nicknameCheck(inputValues.nickname)) {
        axios
          .post(`https://beer4.xyz/users/checknickname`, {
            nickname: inputValues.nickname,
          })
          .then((res) => {
            if (res.status === 200) {
              alert(`사용할 수 있는 닉네임입니다.`);
              handleConfirmNickname(true);
            }
          })
          .catch(() => {
            alert(`이미 존재하는 닉네임입니다.\n다른 닉네임을 사용해주세요.`);
          });
      } else {
        alert(
          `닉네임을 확인해주세요.\n4~8자리의 한글, 영어 또는 숫자 조합이어야 합니다.`,
        );
      }
    } else {
      alert(`닉네임을 입력해주세요.`);
    }
  };
  const handleClickChangeNickname = (): void => {
    const { nickname } = inputValues;
    if (nicknameCheck(nickname) && nicknameConfirm) {
      axios
        .post(`https://beer4.xyz/users/changenickname`, {
          token: token,
          nickname: inputValues.nickname,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: 'CHANGE_NICKNAME',
              userData: { ...userData, nickname: nickname },
            });
            // alert(`닉네임이 정상적으로 변경되었습니다.`);
            setInputValues({ ...inputValues, nickname: '' });
            handleConfirmNickname(false);
            return closeModal();
          }
        })
        .catch(() => {
          alert(`닉네임 변경에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
          handleConfirmNickname(false);
          return closeModal();
        });
    }
  };

  return (
    <MDChangeNickname
      nicknameConfirm={nicknameConfirm}
      inputValues={inputValues}
      handleNicknameOnChange={handleNicknameOnChange}
      handleCheckNickname={handleCheckNickname}
      handleClickChangeNickname={handleClickChangeNickname}
    />
  );
};
