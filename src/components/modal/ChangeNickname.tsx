import React from 'react';
import styled from 'styled-components';

import { MDNicknameChangeProps } from '../../containers/modal/ChangeNicknameContainer';

import { InputWithCheck, Input } from '../../components/user/Signup';
import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  accent,
  lightGrey3,
} from '../../components/nav/color';

const confirmBtnColor = '#989898';
const confirmTextColor = 'lightGrey';

export const MDChangeNickname = ({
  nicknameConfirm,
  inputValues,
  handleNicknameOnChange,
  handleCheckNickname,
  handleClickChangeNickname,
}: MDNicknameChangeProps): JSX.Element => {
  return (
    <ChangeNicknameWrap>
      <NicknameGuide>새로운 닉네임을 입력해주세요.</NicknameGuide>
      <InputWithCheck>
        <Input
          type='text'
          name='nickname'
          defaultValue={inputValues.nickname}
          onChange={handleNicknameOnChange}
        ></Input>
        <NNCheckBtn
          onClick={handleCheckNickname}
          style={
            nicknameConfirm
              ? { background: confirmBtnColor, color: confirmTextColor }
              : {}
          }
        >
          중복 확인
        </NNCheckBtn>
      </InputWithCheck>
      <NicknameSubmitBtn onClick={handleClickChangeNickname}>
        변경하기
      </NicknameSubmitBtn>
    </ChangeNicknameWrap>
  );
};

const ChangeNicknameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  height: 9em;
`;

const NicknameGuide = styled.div`
  margin: 0 0 0.6em 0;
  padding: 0 0 0 0.8em;
`;
const NNCheckBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;

  margin: 0 0 0.6em 0;
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

const NicknameSubmitBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
  width: 8em;

  border: 2px solid ${mainYellowOpac};
  border-radius: 8px;

  margin: 0.7em 0 0.3em 0;
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
  @media (max-width: 425px) {
    font-size: 0.9em;
  }
`;
