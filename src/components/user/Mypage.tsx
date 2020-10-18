import React from 'react';
import styled from 'styled-components';

import { MypageProps } from '../../containers/user/Mypage';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews

export const Mypage = ({
  userData,
  profile,
  handleModal,
  mapInputList,
  getMyReviews,
}: MypageProps): JSX.Element => {
  return (
    <Container>
      <MypageArea className='mypageArea'>
        <SubContainer>
          <Title className='mypageTitle'>mypage</Title>
          <MyReviews onClick={() => getMyReviews()}>내 리뷰</MyReviews>

          <DetailArea>
            <ProfileArea>
              <ProfileTitle>프로필</ProfileTitle>
              <Profile src='fakeLogo.jpg' alt='profile img'></Profile>
              <BtnArea>
                <ProfileBtn>업로드</ProfileBtn>
                <ProfileBtn>삭제</ProfileBtn>
              </BtnArea>
            </ProfileArea>

            <Detail key='profileDetail0'>
              <Subtitle key='profileSub0'>이메일</Subtitle>
              <Content key='profileContent0'>email{userData.email}</Content>
            </Detail>
            {mapInputList()}
            <Detail key='profileDetail4'>
              <Subtitle key='profileSub4'>닉네임</Subtitle>
              <Content key='profileContent1'>
                name{userData.nickname}
                <NicknameBtn>변경하기</NicknameBtn>
              </Content>
            </Detail>
          </DetailArea>
        </SubContainer>
      </MypageArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const MypageArea = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #545454;

  width: 65em;
  padding: 1em 0 2em 0;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: flex-start;
`;

const Title = styled.div``;
const MyReviews = styled.button`
  cursor: pointer;
`;

const DetailArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileArea = styled.div`
  display: grid;
  grid-template-columns: 8em 8em 10em;

  margin: 0 0 2em 0;
`;
const ProfileTitle = styled.div`
  display: flex;
  align-self: flex-end;
`;
const Profile = styled.img`
  width: 100px;
`;
const BtnArea = styled.div`
  display: flex;
  align-items: flex-end;
`;
const ProfileBtn = styled.button`
  cursor: pointer;

  font-size: 0.8em;
`;

export const Detail = styled.div`
  display: grid;
  grid-template-columns: 8em 14em;
  height: 2em;
`;
export const Subtitle = styled.div`
  display: flex;
  align-self: center;
`;
export const Input = styled.input`
  display: flex;
  align-self: center;
`;
const Content = styled.div`
  display: flex;
  align-self: center;
`;
const NicknameBtn = styled.button`
  cursor: pointer;
`;
