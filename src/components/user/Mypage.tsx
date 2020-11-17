import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  MypageProps,
  SubmitBtnArea,
  SubmitBtn,
} from '../../containers/user/MypageContainer';

import { ContentType } from '../../modules/modal';
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
  refDisplay,
  handleModal,
  handleBottomModal,
  getMyRates,
  getMyReviews,
  mapInputList,
  handleClickChangeNickname,
  handleClickMobileChangeNickname,
  handleUploadProfile,
  profileInput,
  handlePostProfile,
  handleChangeProfile,
  handleDeleteProfile,
}: MypageProps): JSX.Element => {
  const dispatch = useDispatch();

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
                  onChange={handleUploadProfile}
                ></Upload>
              </Label>
            </ProfileTitle>
            <ProfileWrap className='profileWrap'>
              <ProfileDiv>
                <ProfileRef
                  style={refDisplay ? undefined : { display: 'none' }}
                  className='profileRef'
                  ref={profileInput}
                ></ProfileRef>
                <ProfileImg
                  style={!refDisplay ? undefined : { display: 'none' }}
                  className='profileImg'
                  src={profile !== '' ? profile : undefined}
                  alt=''
                ></ProfileImg>
              </ProfileDiv>
              <BtnArea className='btnArea'>
                <Btn
                  className='postBtn'
                  onClick={
                    profile === '' ? handlePostProfile : handleChangeProfile
                  }
                >
                  {profile === '' ? `등록` : `변경`}
                </Btn>
                <Btn className='deleteBtn' onClick={handleDeleteProfile}>
                  삭제
                </Btn>
              </BtnArea>
            </ProfileWrap>
          </ProfileArea>

          <Detail1 key='pfDetail1'>
            <Subtitle className='userEmail'>이메일</Subtitle>
            <Content>{userData.email}</Content>
          </Detail1>
          {mapInputList()}
          <Detail5 key='pfDetail5'>
            <Subtitle5 className='userNickname'>닉네임</Subtitle5>
            {userData.nickname}
            <NNSubmitBtnArea>
              <SubmitBtn>
                <ChangeBtn
                  className='nicknameChangeBtn'
                  onClick={handleClickChangeNickname}
                >
                  닉네임 변경하기
                </ChangeBtn>
                <MChangeBtn
                  className='mobileNicknameChangeBtn'
                  onClick={handleClickMobileChangeNickname}
                >
                  닉네임 변경하기
                </MChangeBtn>
              </SubmitBtn>
            </NNSubmitBtnArea>
          </Detail5>

          <Detail6 key='pfDetail6'>
            <Subtitle6 className='userMyReviews'>별점 & 리뷰</Subtitle6>
            <ReviewBtnWrap>
              <MyReviewsBtn
                className='myRates'
                onClick={() => {
                  getMyRates();
                  handleModal(ContentType.MyPageAllRates, true);
                }}
              >
                별점 준 맥주
              </MyReviewsBtn>
              <MMyReviewsBtn
                className='mobileMyRates'
                onClick={() => {
                  getMyRates();
                  handleBottomModal(ContentType.MyPageAllRates, true);
                }}
              >
                별점 준 맥주
              </MMyReviewsBtn>
              <MyReviewsBtn
                className='myReviews'
                onClick={() => {
                  getMyReviews();
                  handleModal(ContentType.MyPageAllReviews, true);
                }}
              >
                리뷰 남긴 맥주
              </MyReviewsBtn>
              <MMyReviewsBtn
                className='mobileMyReviews'
                onClick={() => {
                  getMyReviews();
                  handleBottomModal(ContentType.MyPageAllReviews, true);
                }}
              >
                리뷰 남긴 맥주
              </MMyReviewsBtn>
            </ReviewBtnWrap>
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
  grid-template-columns: 35% auto;

  width: 100%;
  @media (max-width: 1244px) {
    grid-template-columns: 28% auto;
  }
  @media (max-width: 812px) {
    grid-template-columns: 25% auto;
  }
  @media (max-width: 768px) {
    grid-template-columns: 21% auto;
  }
  @media (max-width: 425px) {
    grid-template-rows: 6em 27em auto;
    grid-template-columns: 0vw 86vw;
    margin: 0 0 4em 0.5em;
  }
  @media (max-width: 375px) {
    grid-template-rows: 5em 27em auto;
    margin: 0 0 4em 0.2em;
  }
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
  @media (max-width: 425px) {
    font-size: 1.5em;
  }
`;

const DetailArea = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;

  display: flex;
  flex-direction: column;
`;

const ProfileArea = styled.div`
  display: grid;
  grid-template-columns: 9.5em auto;

  margin: 0 0 3em 0;
  @media (max-width: 425px) {
    grid-template-columns: 7.5em auto;
    margin: 0 0 2em 0;
  }
`;
const ProfileTitle = styled.div`
  grid-column: 1 / 2;
  display: flex;
  align-self: flex-end;
  align-items: flex-end;
  @media (max-width: 425px) {
    font-size: 0.9em;
  }
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

  width: 90px;
  height: 90px;

  border-radius: 50%;
  overflow: hidden;
  margin: 0 0 0 0.5em;
`;
export const ProfileImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150%;
  width: 150%;
  object-fit: contain;
  margin: 0 -0.5em 0 -0.5em;
`;
export const ProfileRef = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  overflow: hidden;

  margin: 0 -0.5em 0 -0.5em;
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
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;

export const Detail = styled.div`
  display: grid;
  grid-template-columns: 10em 15em;
  margin: 0 0 1em 0;
  @media (max-width: 425px) {
    grid-template-columns: 8em auto;
    margin: 0 0 0.5em 0;
    font-size: 0.9em;
  }
`;
export const Detail1 = styled(Detail)`
  margin: 0 0 1.5em 0;
`;
const Detail5 = styled(Detail)`
  margin: 0.3em 0 0.5em 0;
`;
export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Subtitle5 = styled(Subtitle)`
  align-items: flex-start;
`;
const Subtitle6 = styled(Subtitle)`
  @media (max-width: 375px) {
    align-items: flex-start;
    margin: 0.5em 0 0 0;
  }
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
  @media (max-width: 375px) {
    font-size: 0.9em;
    padding: 0.45em 0.5em 0.35em 0.5em;
    margin: -0.1em 0 0.1em 0;
    width: 14.5em;
  }
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const ReviewBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 375px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const NNSubmitBtnArea = styled.div`
  display: grid;
  grid-template-columns: 10em 14em;
  margin: 0.4em 0 0.5em 0;
  @media (max-width: 425px) {
    grid-template-columns: 8em auto;
  }
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
  @media (max-width: 425px) {
    display: none;
    pointer-events: none;
  }
`;
export const MChangeBtn = styled.button`
  pointer-events: none;
  display: none;

  cursor: pointer;
  align-items: center;
  justify-content: center;

  width: 9em;

  border: 2px solid ${mainYellowOpac};
  border-radius: 8px;

  margin: 0;
  padding: 0.625em 0.7em 0.525em 0.7em;

  font-size: 0.9em;
  background-color: #fff;
  color: ${mainYellow};

  &:hover {
    background-color: ${mainYellow};
    color: white;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    cursor: pointer;
    pointer-events: auto;
    display: flex;
  }
`;
// const ChangeNNBtn = styled(ChangeBtn)`
//   margin: 0 0 0 0.6em;
// `;
const Detail6 = styled(Detail)`
  margin: 0.5em 0 1em 0;
`;

const MyReviewsBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 9em;

  border: 2px solid ${mainYellow};
  border-radius: 8px;

  margin: 0 0.5em 0 0;
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
  @media (max-width: 425px) {
    display: none;
    pointer-events: none;
  }
`;
const MMyReviewsBtn = styled.button`
  pointer-events: none;
  display: none;

  cursor: pointer;
  align-items: center;
  justify-content: center;

  width: 9em;

  border: 2px solid ${mainYellow};
  border-radius: 8px;

  margin: 0 0.5em 0 0;
  padding: 0.525em 0.5em 0.425em 0.5em;

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
  @media (max-width: 425px) {
    cursor: pointer;
    pointer-events: auto;
    display: flex;
  }
`;
