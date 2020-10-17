import React from 'react';
import styled from 'styled-components';

import { MypageProps } from '../../containers/user/Mypage';

export const Mypage = ({
  userData,
  profile,
  mapInputList,
}: MypageProps): JSX.Element => {
  return (
    <Container>
      <MypageArea className='mypageArea'>
        <Title className='mypageTitle'>mypage</Title>
        <ProfileArea>
          <Subtitle>프로필</Subtitle>
          <Profile src='fakeLogo.jpg' alt='profile img'></Profile>
          <div>{`image ${profile}`}</div>
          <BtnArea>
            <ProfileBtn>사진 업로드</ProfileBtn>
            <ProfileBtn>사진 삭제</ProfileBtn>
          </BtnArea>
        </ProfileArea>
        <DetailArea>
          <Detail key='profileDetail0'>
            <Subtitle key='profileSub0'>이메일</Subtitle>
            <Content key='profileContent0'>email{userData.email}</Content>
          </Detail>
          {mapInputList()}
          <Detail key='profileDetail4'>
            <Subtitle key='profileSub4'>닉네임</Subtitle>
            <Content key='profileContent1'>name{userData.username}</Content>
          </Detail>
        </DetailArea>
      </MypageArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MypageArea = styled.div``;
const Title = styled.div``;

const ProfileArea = styled.div``;
const Profile = styled.img`
  width: 100px;
`;

const DetailArea = styled.div``;
const Detail = styled.div``;
const Subtitle = styled.div``;
const Content = styled.div``;

const BtnArea = styled.div``;
const ProfileBtn = styled.button`
  cursor: pointer;
`;
