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
import { passwordCheck, passwordMatch } from './userUtils';

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
  handleProfilePost(): void;
}

const MypageContainer = (props: RouterProps): JSX.Element => {
  // profile pic 작업 중
  const profileInput = React.useRef(null);
  const formData = new FormData();

  const handleProfileUpload = (
    // 사진 ref에 업로드만, 전송 x 함수
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const target = e.currentTarget.files as FileList;
    console.log(target[0]);
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

  const handleProfilePost = (): void => {
    const index = formData.getAll('image').length;
    console.log(formData.getAll('image')[index - 1]); // 이거 전송!
    // axios
    //   .post(`https://beer4.xyz/users/profile`, formData)
    //   .then((res) => console.log(res));
  };

  // 최상단
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
    console.log('change password test');
    if (
      passwordCheck(newPassword) &&
      passwordMatch(newPassword, passwordForCheck)
    ) {
      axios
        .post(`https://beer4.xyz/users/changepassword`, {
          currentPassword: currentPassword,
          newPassword: newPassword,
          token: token,
        })
        .then((res) => {
          console.log(res.data);
        }); ////// 추가 체크 필요
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
      handleProfileUpload={handleProfileUpload}
      profileInput={profileInput}
      handleProfilePost={handleProfilePost}
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
