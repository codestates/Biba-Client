import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../../modules';
import { User, UserState, UserProfile } from '../../modules/user';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { Mypage } from '../../components/user/Mypage';
import {
  Content,
  Detail,
  Subtitle,
  Input,
  ChangeBtn,
} from '../../components/user/Mypage';
import { passwordCheck, passwordMatch } from './utils';

export interface MypageProps {
  userData: User;
  profile: string;
  handleModal(contentType: ContentType, display: boolean): void;
  getMyReviews(): void;
  mapInputList(): JSX.Element[];
  handleClickChangeNickname(): void;
}

const MypageContainer = (props: RouterProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { profile } = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };

  const deleteProfile = (): void => {
    axios
      .post('http://localhost:4000/users/deleteprofile', {
        // 임시 주소, DB에서 프로필 삭제 요청
        test: 'delete profile',
      })
      .then((res) => {
        console.log('response: profile deleted');
      });
    dispatch({ type: 'DELETE_PROFILE' });
    // store에서 profile 이미지 삭제
  };

  const getMyReviews = (): void => {
    axios
      // user id 전송해서 review 받아오기(:id === number 붙여서 get 요청)
      .get<{ message: string }[]>('http://localhost:4000/custom/mypost/4')
      .then((res) => {
        const myReviews = res.data;
        dispatch({ type: 'SET_MYREVIEWS', myReviews });
        handleModal(ContentType.MypageAllReviews, true);
      }); // [{}, {}]
  };
  const handleClickChangeNickname = (): void => {
    handleModal(ContentType.ChangeNickname, true);
  };

  const [inputValues, setInputValues] = useState({
    currentPassword: '',
    newPassword: '',
    passwordForCheck: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleClickChangePassword = (): void => {
    const { currentPassword, newPassword, passwordForCheck } = inputValues;
    console.log('change password test');
    if (
      passwordCheck(newPassword) &&
      passwordMatch(newPassword, passwordForCheck)
    ) {
      // currentPassword 확인 - token 사용할지 체크 필요
      // true 라면 -> newPassword 전송
    }
  };

  const inputList: string[][] = [
    ['currentPassword', '현재 비밀번호', '사용 중인 비밀번호를 입력하세요.'],
    ['newPassword', '변경할 비밀번호', '변경할 비밀번호를 입력하세요.'],
    ['passwordForCheck', '비밀번호 확인', '비밀번호를 다시 한번 입력하세요.'],
  ];
  const mapInputList = (): JSX.Element[] => {
    return inputList.map((ele) => {
      return (
        <Detail key={`pfDetail${inputList.indexOf(ele) + 2}`}>
          <Subtitle>{ele[1]}</Subtitle>
          <Input
            name={ele[0]}
            type='password'
            onChange={handleOnChange}
            placeholder={ele[2]}
          ></Input>
          {inputList.indexOf(ele) === 2 ? (
            <SubmitBtnArea>
              <SubmitBtn>
                <ChangeBtn onClick={handleClickChangePassword}>
                  비밀번호 변경하기
                </ChangeBtn>
              </SubmitBtn>
            </SubmitBtnArea>
          ) : (
            <></>
          )}
        </Detail>
      );
    });
  };
  return (
    <Mypage
      userData={userData}
      profile={profile}
      handleModal={handleModal}
      getMyReviews={getMyReviews}
      mapInputList={mapInputList}
      handleClickChangeNickname={handleClickChangeNickname}
    />
  );
};

export const MypageContainerWithRouter = withRouter(MypageContainer);

export const SubmitBtnArea = styled.div`
  display: grid;
  grid-template-columns: 8em 14em;
  margin: 0.5em 0 0.5em 0;
`;
export const SubmitBtn = styled.div`
  display: flex;
  grid-column 2 / 3;
  align-self: center;
`;
