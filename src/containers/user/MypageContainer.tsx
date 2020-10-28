import React, { useEffect, useRef, useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../../modules';
import { User, UserState, UserProfile } from '../../modules/user';
import { ContentType } from '../../modules/nav';
import { aReview } from '../../modules/beerdetail';
import { Mypage } from '../../components/user/Mypage';
import {
  Content,
  Detail,
  Subtitle,
  Input,
  ChangeBtn,
} from '../../components/user/Mypage';
import { nicknameCheck, passwordCheck, passwordMatch } from './userUtils';

interface IProfile extends HTMLDivElement {
  src: string | ArrayBuffer | null;
}

export interface MypageProps {
  userData: User;
  profile: string;
  handleModal(contentType: ContentType, display: boolean): void;
  getMyReviews(): void;
  mapInputList(): JSX.Element[];
  handleClickChangeNickname(): void;
  handleProfileUpload(e: React.ChangeEvent<HTMLInputElement>): void;
  profileInput: React.RefObject<HTMLImageElement>;
  handlePostProfile(): void;
}

const MypageContainer = (props: RouterProps): JSX.Element => {
  // 최상단
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { profile } = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };

  const getMyReviews = (): void => {
    axios
      // .get<aReview>(`http://localhost:4000/custom/mypost/4`)
      .post<aReview>(`https://beer4.xyz/comment/mylist`, {
        token: token,
      })
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
    if (
      passwordCheck(newPassword) &&
      passwordMatch(newPassword, passwordForCheck)
    ) {
      console.log({
        currentPassword: currentPassword,
        newPassword: newPassword,
        token: token,
      });
      axios
        .post(`https://beer4.xyz/users/changepassword`, {
          currentPassword: currentPassword,
          newPassword: newPassword,
          token: token,
        })
        .then((res) => {
          console.log(res.data);
          // 200일 경우 vs 200 아닐 경우 분기
          setInputValues({
            ...inputValues,
            currentPassword: '',
            newPassword: '',
            passwordForCheck: '',
          });
        })
        .catch(() => {
          setInputValues({
            ...inputValues,
            currentPassword: '',
            newPassword: '',
            passwordForCheck: '',
          });
          alert(`비밀번호를 확인해주세요.`);
        });
    } else if (!passwordCheck(newPassword)) {
      setInputValues({
        ...inputValues,
        newPassword: '',
      });
      return alert(
        `비밀번호를 확인해주세요.\n8자 이상의 영문, 숫자 또는 특수문자 조합이어야 합니다.`,
      );
    } else if (!passwordMatch(newPassword, passwordForCheck)) {
      setInputValues({
        ...inputValues,
        newPassword: '',
        passwordForCheck: '',
      });
      return alert(`동일한 비밀번호를 입력해주세요.`);
    }
  };

  // ================================================ profile pic 작업 중
  const profileInput = React.useRef(null);
  const formData = new FormData();
  formData.append('nickname', userData.nickname);
  formData.append('token', token);

  const handleProfileUpload = (
    // 사진 ref에 업로드만, 전송 xxxxxxxxx
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const target = e.currentTarget.files as FileList;
    formData.append('image', target[0]);
    if (profileInput.current) {
      const { current } = profileInput as React.RefObject<IProfile>;
      const fr = new FileReader();
      fr.onload = () => {
        if (current) {
          current.src = fr.result;
        }
      };
      console.log(target);
      fr.readAsDataURL(target[0]);
      console.log(formData.getAll('image'));
    }
    setTimeout(() => console.log(profileInput), 1000);
    // 전송 후 이미지 주소(S3 주소) 받아서 dispatch 필요
  };

  const handlePostProfile = (): void => {
    const index = formData.getAll('image').length;
    console.log(formData.getAll('image')[index - 1]); // 이거 전송! 가장 최근 거
    console.log(formData.get('token'));
    console.log(formData.getAll('nickname'));
    axios
      .post(`https://beer4.xyz/users/profile`, formData)
      .then((res) => console.log(res));
  };

  const handleDeleteProfile = (): void => {
    axios
      .post(`https://beer4.xyz/users/profile/delete`, {
        // 임시 주소, DB에서 프로필 삭제 요청
        nickname: userData.nickname,
      })
      .then((res) => {
        console.log('response: profile deleted');
      });
    dispatch({ type: 'DELETE_PROFILE' });
    // store에서 profile 이미지 삭제
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
            value={
              inputList.indexOf(ele) === 0
                ? inputValues.currentPassword
                : inputList.indexOf(ele) === 1
                ? inputValues.newPassword
                : inputValues.passwordForCheck
            }
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
      handleProfileUpload={handleProfileUpload}
      profileInput={profileInput}
      handlePostProfile={handlePostProfile}
    />
  );
};

export const MypageContainerWithRouter = withRouter(MypageContainer);

export const SubmitBtnArea = styled.div`
  display: grid;
  grid-template-columns: 10em 14em;
  margin: 0.8em 0 0.5em 0;
`;
export const SubmitBtn = styled.div`
  display: flex;
  grid-column 2 / 3;
  align-self: center;
`;
