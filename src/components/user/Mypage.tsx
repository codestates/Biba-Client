import React from 'react';
import styled from 'styled-components';

import { MypageProps } from '../../containers/user/MypageContainer';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews

export const Mypage = ({
  userData,
  profile,
  profileTest,
  handleModal,
  getMyReviews,
  mapInputList,
  handleClickChangeNickname,
}: MypageProps): JSX.Element => {
  return (
    <Container>
      <MypageArea className='mypageArea'>
        <SubContainer>
          <Title className='mypageTitle'>mypage</Title>
          <MyReviews onClick={() => getMyReviews()}>내 리뷰</MyReviews>

          <DetailArea>
            <ProfileArea key='pfDetail0'>
              <ProfileTitle>프로필</ProfileTitle>
              <Profile>{profileTest()}</Profile>
              <BtnArea>
                <ProfileBtn>업로드</ProfileBtn>
                <ProfileBtn>삭제</ProfileBtn>
              </BtnArea>
            </ProfileArea>

            <Detail key='pfDetail1'>
              <Subtitle>이메일</Subtitle>
              <Content>{userData.email}</Content>
            </Detail>
            {mapInputList()}
            <Detail key='pfDetail5'>
              <Subtitle>닉네임</Subtitle>
              <Content>
                {userData.nickname}
                <ChangeBtn
                  className='nicknameChangeBtn'
                  onClick={handleClickChangeNickname}
                >
                  닉네임 변경하기
                </ChangeBtn>
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

  width: 100%;
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
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #545454;

  width: 100px;
  height: 100px;
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
  margin: 0 0 0.5em 0;
`;
export const Subtitle = styled.div`
  display: flex;
  align-self: center;
`;
export const Input = styled.input`
  display: flex;
  align-self: center;
`;
export const Content = styled.div`
  display: flex;
  align-self: center;
`;
export const ChangeBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 10em;
`;
