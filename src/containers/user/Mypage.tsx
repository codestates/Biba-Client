import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../../modules';
import { User, UserState, UserProfile } from '../../modules/user';
import { Mypage } from '../../components/user/Mypage';

export interface MypageProps {
  userData: User;
  profile: string;
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
  return <Mypage userData={userData} profile={profile} />;
};

export const MypageContainerWithRouter = withRouter(MypageContainer);
