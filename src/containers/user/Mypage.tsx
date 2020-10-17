import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../../modules';
import { User, UserState, UserProfile } from '../../modules/user';
import { Mypage } from '../../components/user/Mypage';
import { Detail, Subtitle, Input } from '../../components/user/Mypage';

export interface MypageProps {
  userData: User;
  profile: string;
  mapInputList(): JSX.Element[];
}

const MypageContainer = (props: RouterProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { profile } = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();
  const deleteProfile = () => {
    axios
      .post('http://localhost:4000/users/deleteprofile', {
        // 임시 주소, DB에서 프로필 삭제 요청
        test: 'delete profile',
      })
      .then((res) => {
        console.log('profile deleted');
      });
    dispatch({ type: 'DELETE_PROFILE' });
    // store에서 profile 이미지 삭제
  };

  const inputList: string[][] = [
    ['현재 비밀번호', '사용 중인 비밀번호를 입력하세요.'],
    ['변경할 비밀번호', '변경할 비밀번호를 입력하세요.'],
    ['비밀번호 확인', '비밀번호를 다시 한번 입력하세요.'],
  ];

  const mapInputList = (): JSX.Element[] => {
    return inputList.map((ele) => (
      <Detail key={`profileDetail${inputList.indexOf(ele) + 1}`}>
        <Subtitle key={`profileSub${inputList.indexOf(ele) + 1}`}>
          {ele[0]}
        </Subtitle>
        <Input
          type='password'
          key={`profileInput${inputList.indexOf(ele)}`}
          placeholder={ele[1]}
        ></Input>
      </Detail>
    ));
  };
  return (
    <Mypage userData={userData} profile={profile} mapInputList={mapInputList} />
  );
};

export const MypageContainerWithRouter = withRouter(MypageContainer);
