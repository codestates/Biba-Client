import React, { useEffect, useRef, useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../../modules';
import { User, UserState, UserProfile } from '../../modules/user';
import { ContentType } from '../../modules/modal';
import { aReview } from '../../modules/beerdetail';
import { Mypage, ProfileRef } from '../../components/user/Mypage';
import {
  Content,
  Detail,
  Subtitle,
  Input,
  ChangeBtn,
} from '../../components/user/Mypage';
import { nicknameCheck, passwordCheck, passwordMatch } from './userUtils';

export interface IProfile extends HTMLDivElement {
  src: string | ArrayBuffer | null;
}

export interface MypageProps {
  userData: User;
  profile: string;
  refDisplay: boolean;
  handleModal(contentType: ContentType, display: boolean): void;
  getMyRates(): void;
  getMyReviews(): void;
  mapInputList(): JSX.Element[];
  handleClickChangeNickname(): void;
  handleUploadProfile(e: React.ChangeEvent<HTMLInputElement>): void;
  profileInput: React.RefObject<HTMLImageElement>;
  handlePostProfile(): void;
  handleChangeProfile(): void;
  handleDeleteProfile(): void;
}

const MypageContainer = (props: RouterProps): JSX.Element => {
  // 최상단
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  const refDisplay = useSelector(
    (state: RootState) => state.refDisplay.display,
  );

  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const getMyRates = (): void => {
    axios
      .post<aReview[]>(`https://beer4.xyz/comment/mylist`, {
        token: token,
      }) // 내가 리뷰를 작성한 맥주에 대해
      .then((res) => {
        const rawReviews = res.data;
        dispatch({ type: 'SET_MYREVIEWS', myReviews: rawReviews });
        handleModal(ContentType.MyPageAllRates, true);
      }); // [{}, {}]
  };
  const getMyReviews = (): void => {
    axios
      .post<aReview[]>(`https://beer4.xyz/comment/mylist`, {
        token: token,
      }) // 내가 리뷰를 작성한 맥주에 대해
      .then((res) => {
        const rawReviews = res.data;
        const withComments = rawReviews.filter((ele) => {
          if (ele.comment !== '') return ele;
        });
        dispatch({ type: 'SET_MYREVIEWS', myReviews: withComments });
        handleModal(ContentType.MyPageAllReviews, true);
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
      axios
        .post(`https://beer4.xyz/users/changepassword`, {
          currentPassword: currentPassword,
          newPassword: newPassword,
          token: token,
        })
        .then((res) => {
          // console.log(res.data);
          // 200일 경우 vs 200 아닐 경우 분기
          if (res.status === 200) {
            setInputValues({
              ...inputValues,
              currentPassword: '',
              newPassword: '',
              passwordForCheck: '',
            });
            return alert(`비밀번호가 변경되었습니다.`);
          } else {
            return alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
          }
        })
        .catch(() => {
          return alert(`비밀번호를 확인해주세요.`);
        });
    } else if (!passwordCheck(newPassword)) {
      setInputValues({
        ...inputValues,
        newPassword: '',
        passwordForCheck: '',
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

  const profileInput = React.useRef(null);
  const formData = new FormData();
  formData.append('nickname', userData.nickname);
  formData.append('token', token);
  const handleUploadProfile = (
    // 사진 ref에 업로드만, 전송 x
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const target = e.currentTarget.files as FileList;
    formData.append('image', target[0]);
    // console.log('::::: target :::::', target);
    if (profileInput.current) {
      const { current } = profileInput as React.RefObject<IProfile>;
      const fr = new FileReader();
      fr.onload = () => {
        if (current) {
          current.src = fr.result;
        }
      };
      // console.log('::::: upload :::::', formData.getAll('image'));
      if (target[0]) {
        fr.readAsDataURL(target[0]);
        if (formData.getAll('image').length !== 0) {
          dispatch({ type: 'REF_DISPLAY', display: true });
        } else {
          dispatch({ type: 'REF_DISPLAY', display: false });
        }
      }
    }
  };

  const handlePostProfile = (): void => {
    // console.log('::::: post :::::', formData.getAll('image'));
    axios
      .post(`https://beer4.xyz/users/profile`, formData)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          const { profile } = res.data;
          dispatch({ type: 'SET_PROFILE', profile });
          dispatch({ type: 'REF_DISPLAY', display: false });
          // alert(`프로필 사진이 등록되었습니다.`);
        } else {
          // console.log('::::: post :::::', res);
          alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
        }
      })
      .catch(() => {
        alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
      });
  };

  const handleChangeProfile = (): void => {
    // console.log('::::: change :::::', formData.getAll('image'));
    if (formData.get('image') === null) {
      // console.log(formData.getAll('image'));
      return alert(`먼저 사진을 업로드해주세요.`);
    }
    axios
      .post(`https://beer4.xyz/users/profile/delete`, {
        nickname: userData.nickname,
      })
      .then((res) => {
        // console.log(formData.getAll('image'));

        if (res.status === 200) {
          // console.log(res);

          axios
            .post(`https://beer4.xyz/users/profile`, formData)
            .then((res) => {
              if (res.status === 200) {
                const { profile } = res.data;
                dispatch({ type: 'CHANGE_PROFILE', profile });
                dispatch({ type: 'REF_DISPLAY', display: false });
                // alert(`프로필 사진이 변경되었습니다.`);
              } else {
                // console.log('::::: change :::::', res);
                alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
              }
            })
            .catch(() => {
              alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
            });
        } else {
          // console.log('::::: change :::::', res);
          alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
        }
      })
      .catch(() => {
        alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
      });
  };

  const handleDeleteProfile = (): void => {
    axios
      .post(`https://beer4.xyz/users/profile/delete`, {
        nickname: userData.nickname,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          const { current } = profileInput as React.RefObject<IProfile>;
          if (current) {
            current.src = null;
          }
          dispatch({ type: 'DELETE_PROFILE' });
          dispatch({ type: 'REF_DISPLAY', display: true });
          // alert(`프로필 사진이 삭제되었습니다.`);
        } else {
          // console.log('::::: delete :::::', res);
          alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
        }
      })
      .catch(() => {
        alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
      });
    // store에서 profile 이미지 삭제
  };

  const inputList: string[][] = [
    ['currentPassword', '현재 비밀번호', '사용 중인 비밀번호를 입력하세요.'],
    ['newPassword', '변경할 비밀번호', '변경할 비밀번호를 입력하세요.'],
    ['passwordForCheck', '비밀번호 확인', '비밀번호를 다시 입력하세요.'],
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
      refDisplay={refDisplay}
      handleModal={handleModal}
      getMyRates={getMyRates}
      getMyReviews={getMyReviews}
      mapInputList={mapInputList}
      handleClickChangeNickname={handleClickChangeNickname}
      handleUploadProfile={handleUploadProfile}
      profileInput={profileInput}
      handlePostProfile={handlePostProfile}
      handleChangeProfile={handleChangeProfile}
      handleDeleteProfile={handleDeleteProfile}
    />
  );
};

export const MypageContainerWithRouter = withRouter(MypageContainer);

export const SubmitBtnArea = styled.div`
  display: grid;
  grid-template-columns: 10em 14em;
  margin: 0.8em 0 0.5em 0;
  @media (max-width: 425px) {
    grid-template-columns: 8em auto;
    margin: 0.4em 0 0.5em 0;
  }
`;
export const SubmitBtn = styled.div`
  display: flex;
  grid-column 2 / 3;
  align-self: center;
`;
