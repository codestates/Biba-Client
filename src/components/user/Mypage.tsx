import React from 'react';
import styled from 'styled-components';

import { MypageProps } from '../../containers/user/MypageContainer';
import { ContentType } from '../../modules/nav';
import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  lightGrey1,
  lightGrey2,
  btnOff,
  btnOffText,
  pDefault,
} from '../../components/nav/color';

export const Mypage = ({
  userData,
  profile,
  handleModal,
  getMyReviews,
  mapInputList,
  handleClickChangeNickname,
  handleProfileUpload,
  profileInput,
  handleProfilePost,
}: MypageProps): JSX.Element => {
  return (
    <Container>
      <MypageArea className='mypageArea'>
        <Title className='mypageTitle'>
          Biba!
          <br />
          My page
        </Title>
        <DetailArea className='detailArea'>
          <ProfileArea className='profileArea' key='pfDetail0'>
            <ProfileTitle className='profileTitle'>
              프로필
              <Label htmlFor='profileUpload'>
                업로드
                <Upload
                  id='profileUpload'
                  className='uploadBtn'
                  type='file'
                  accept='image/*'
                  onChange={handleProfileUpload}
                ></Upload>
              </Label>
            </ProfileTitle>
            <ProfileWrap className='profileWrap'>
              <ProfileDiv>
                <ProfileImg
                  className='profileImg'
                  ref={profileInput}
                ></ProfileImg>
              </ProfileDiv>
              <BtnArea className='btnArea'>
                <Btn className='postBtn' onClick={handleProfilePost}>
                  등록
                </Btn>
                <Btn className='deleteBtn'>삭제</Btn>
              </BtnArea>
            </ProfileWrap>
          </ProfileArea>

          <Detail1 key='pfDetail1'>
            <Subtitle className='userEmail'>이메일</Subtitle>
            <Content>{userData.email}</Content>
          </Detail1>
          {mapInputList()}
          <Detail key='pfDetail5'>
            <Subtitle className='userNickname'>닉네임</Subtitle>
            <Content>
              {userData.nickname}
              <ChangeNNBtn
                className='nicknameChangeBtn'
                onClick={handleClickChangeNickname}
              >
                닉네임 변경하기
              </ChangeNNBtn>
            </Content>
          </Detail>

          <Detail6 key='pfDetail6'>
            <Subtitle className='userMyReviews'>리뷰</Subtitle>
            <Content>
              <MyReviews className='myReviews' onClick={() => getMyReviews()}>
                나의 리뷰
              </MyReviews>
            </Content>
          </Detail6>
        </DetailArea>
      </MypageArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;

  color: ${mainGrey};
`;
const MypageArea = styled.div`
  display: grid;
  grid-template-rows: 7em 30em auto;
  grid-template-columns: 37% auto;

  width: 100%;
`;

const Title = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / 3;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 0 0.5em 0;

  font-size: 1.7em;
  font-weight: 600;
  line-height: 1.3;
  color: ${mainYellow};
`;

const DetailArea = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;

  display: flex;
  flex-direction: column;
`;

const ProfileArea = styled.div`
  display: grid;
  grid-template-columns: 10em auto;

  margin: 0 0 3em 0;
`;
const ProfileTitle = styled.div`
  grid-column: 1 / 2;
  display: flex;
  align-self: flex-end;

  align-items: flex-end;
`;
const ProfileWrap = styled.div`
  grid-column: 2 / 3;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;
const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${mainYellowOpac};

  width: 100px;
  height: 100px;
`;
const ProfileImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
`;
const Label = styled.label`
  grid-column: 2 / 3;

  cursor: pointer;

  display: inline-block;
  width: 50px;
  height: 1.7em;
  border: 1.5px solid ${mainYellowOpac};
  border-radius: 4px;

  margin: 0 0 0 0.4em;
  padding: 0.2em;

  font-size: 0.8em;
  // font-weight: 300;
  text-align: center;
  background-color: #fff;
  color: ${mainGreyOpac};

  &:hover {
    background-color: ${mainYellowOpac};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

const Upload = styled.input`
  display: none;
`;
const BtnArea = styled.div`
  display: flex;
  align-items: flex-end;

  margin: 0 0 0 0.5em;
`;
const Btn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;

  border: 0.5px solid white;
  border-radius: 8px;

  margin: 0 0.2em 0 0;
  padding: 0.4em 0.7em 0.33em 0.7em;

  font-size: 0.9em;
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

export const Detail = styled.div`
  display: grid;
  grid-template-columns: 10em 14em;
  margin: 0 0 1em 0;
`;
export const Detail1 = styled(Detail)`
  margin: 0 0 1.5em 0;
`;
export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const Input = styled.input`
  display: flex;

  border: 0px solid ${mainYellow};
  border-radius: 8px;
  width: 15em;

  margin: 0;
  padding: 0.4em 0.5em 0.3em 0.5em;

  font-size: 0.95em;
  line-height: 1.5;
  background-color: ${lightGrey1};
  &:focus {
    outline: none;
  }
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const ChangeBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 9em;

  border: 2px solid ${mainYellowOpac};
  border-radius: 8px;

  margin: 0;
  padding: 0.525em 0.6em 0.425em 0.6em;

  font-size: 0.9em;
  // font-weight: 300;
  background-color: #fff;
  color: ${mainYellow};

  &:hover {
    background-color: ${mainYellow};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
const ChangeNNBtn = styled(ChangeBtn)`
  margin: 0 0 0 0.6em;
`;
const Detail6 = styled(Detail)`
  margin: 0.3em 0 1em 0;
`;

const MyReviews = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 9em;

  border: 2px solid ${mainYellow};
  border-radius: 8px;

  margin: 0;
  padding: 0.525em 0.6em 0.425em 0.6em;

  font-size: 0.9em;
  // font-weight: 300;
  background-color: ${mainYellow};
  color: #fff;

  &:hover {
    border: 2px solid ${mainGrey};

    background-color: ${mainGrey};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
