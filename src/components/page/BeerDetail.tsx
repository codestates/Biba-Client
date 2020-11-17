import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import { ContentType } from '../../modules/modal';
import { BeerDetailProps } from '../../containers/page/BeerDetailContainer';
import { Chart } from '../../containers/page/radar';
import {
  mainYellow,
  mainYellowOpac,
  subYellow,
  subYellowOpac,
  accent,
  mainGrey,
  mainGreyOpac,
  lightGrey1,
  lightGrey2,
  lightGrey3,
  btnOff,
  btnOffText,
  tabColor,
  pDefault,
  chartAccent2,
  chartYellow1,
  chartAccent1,
  chartYellow2,
} from '../../components/nav/color';

export const BeerDetail = ({
  isLogin,
  beerDetail,
  compareMyBeers,
  bookmark,
  handleModal,
  handleBottomModal,
  handleBookmark,
  handleTag,
  disBasic,
  disStory,
  disMore,
  tabBasic,
  tabStory,
  tabMore,
  handleInfoTab,
  handleStar,
  user_review,
  user_input,
  user_star,
  handleClickUsersReview,
  handleClickMobileUsersReview,
  mainReviewList,
  handleClickMobileAllReviews,
  handleClickAllReviews,
}: BeerDetailProps): JSX.Element => {
  return (
    <Outer className='detailOuter'>
      <Container className='detailContainer'>
        <DetailTitle className='detailTitle'>
          <TitleText>맥주 상세 정보</TitleText>
        </DetailTitle>
        <ImgDiv className='detailImgDiv'>
          <Img className='detailBeerImg' src={beerDetail.beer_img} alt='' />
        </ImgDiv>
        <InfoDiv className='infoDiv'>
          <BeerName className='beerName'>{beerDetail.beer_name}</BeerName>
          <AveFavWrap className='aveFavWrap'>
            <SubText className='beerAverage'>
              별점 평균
              <Rate>{beerDetail.rate}</Rate>
            </SubText>
            <FavToggle className='favToggle'>
              <FavTitle>즐겨찾기</FavTitle>
              <FavWrap className='favWrap'>
                <Fav
                  id='favToggle'
                  type='checkbox'
                  onChange={() => {
                    handleBookmark();
                    return isLogin
                      ? false
                      : handleModal(ContentType.Login, true);
                  }}
                  checked={bookmark}
                ></Fav>
                <FavLB htmlFor='favToggle'></FavLB>
                <MFav
                  id='mobileFavToggle'
                  type='checkbox'
                  onChange={() => {
                    handleBookmark();
                    return isLogin
                      ? false
                      : handleBottomModal(ContentType.Login, true);
                  }}
                  checked={bookmark}
                ></MFav>
                <MFavLB htmlFor='mobileFavToggle'></MFavLB>
              </FavWrap>
            </FavToggle>
          </AveFavWrap>
          <TagWrap>
            <TagSubText>태그</TagSubText>
            {handleTag() !== false ? (
              handleTag()
            ) : (
              <TagEmpty>준비 중입니다.</TagEmpty>
            )}
          </TagWrap>
          <ChartWrap className='chartWrap'>
            <ChartDiv className='chartDiv'>{Chart()}</ChartDiv>
            <CompareBtn
              className='compareBtn'
              onClick={() => {
                compareMyBeers();
                return isLogin
                  ? handleModal(ContentType.MyBeerList, true)
                  : handleModal(ContentType.Login, true);
              }}
            >
              맥주 비교하기
            </CompareBtn>
            <MCompareBtn
              className='mobileCompareBtn'
              onClick={() => {
                compareMyBeers();
                return isLogin
                  ? handleBottomModal(ContentType.MyBeerList, true)
                  : handleBottomModal(ContentType.Login, true);
              }}
            >
              맥주 비교하기
            </MCompareBtn>
          </ChartWrap>
          <InfoBody className='infoBody'>
            <TabDetail className='tabDetail'>
              <TabWrap className='infoTabWrap'>
                <Tab
                  id='basic'
                  className='infoTab'
                  onClick={handleInfoTab}
                  style={
                    disBasic
                      ? tabBasic
                        ? { background: `${mainYellow}` }
                        : {}
                      : { display: 'none' }
                  }
                >
                  맥주 소개
                </Tab>
                <Divider style={disBasic ? undefined : { display: 'none' }}>
                  &nbsp;{' '}
                </Divider>
                <Tab
                  id='story'
                  className='infoTab'
                  onClick={handleInfoTab}
                  style={
                    disStory
                      ? tabStory
                        ? { background: `${mainYellow}` }
                        : {}
                      : { display: 'none' }
                  }
                >
                  스토리
                </Tab>
                <Divider style={disStory ? undefined : { display: 'none' }}>
                  &nbsp;{' '}
                </Divider>
                <Tab
                  id='more'
                  className='infoTab'
                  onClick={handleInfoTab}
                  style={tabMore ? { background: `${mainYellow}` } : {}}
                >
                  상세 정보
                </Tab>
              </TabWrap>
              <InfoDetailWrap>
                <InfoDetail1
                  className='infoDetail'
                  style={
                    disBasic
                      ? tabBasic
                        ? {}
                        : { display: 'none' }
                      : { display: 'none' }
                  }
                >
                  <P className='content'>{beerDetail.explain}</P>
                </InfoDetail1>
                <InfoDetail2
                  className='infoDetail'
                  style={
                    disStory
                      ? tabStory
                        ? {}
                        : { display: 'none' }
                      : { display: 'none' }
                  }
                >
                  <P className='content'>{beerDetail.story}</P>
                </InfoDetail2>
                <InfoDetail3
                  className='infoDetail'
                  style={tabMore ? {} : { display: 'none' }}
                >
                  {disMore ? (
                    <>
                      <PWrap>
                        <PT className='contentT'>제조사</PT>
                        <PT className='contentT'>제조국</PT>
                        <PT className='contentT'>스타일</PT>
                        <PT className='contentT'>ABV</PT>
                        <PT className='contentT'>IBU</PT>
                      </PWrap>
                      <PWrap>
                        <P className='content'>{beerDetail.company}</P>
                        <P className='content'>{beerDetail.country}</P>
                        <P className='content'>{beerDetail.style_name}</P>
                        <P className='content'>{beerDetail.abv}</P>
                        <P className='content'>{beerDetail.ibu}</P>
                      </PWrap>
                    </>
                  ) : (
                    <>등록된 정보가 없습니다.</>
                  )}
                </InfoDetail3>
              </InfoDetailWrap>
              <Source>
                {beerDetail.source.length > 5
                  ? `출처 - ${beerDetail.source}`
                  : ``}
              </Source>
            </TabDetail>
          </InfoBody>
        </InfoDiv>
        <RateReview className='rateReview'>
          <RatingArea className='ratingArea'>
            <UserRate className='rate'>내가 준 별점</UserRate>
            <Stars className='stars'>{handleStar()}</Stars>
            <WriteComment
              className='commentBtn'
              onClick={handleClickUsersReview}
            >
              {user_review ? `평가 수정하기` : `맥주 평가하기`}
            </WriteComment>
          </RatingArea>
          <CommentArea className='commentArea'>
            <List className='commentList'>{mainReviewList()}</List>
            <MBtnWrap>
              <MWriteComment
                className='mobileCommentBtn'
                onClick={handleClickMobileUsersReview}
              >
                {user_review ? `평가 수정하기` : `맥주 평가하기`}
              </MWriteComment>
              <CommentAll
                className='commentAllBtn'
                onClick={handleClickAllReviews}
              >
                리뷰 전체보기
              </CommentAll>
              <MCommentAll
                className='mobileCommentAllBtn'
                onClick={handleClickMobileAllReviews}
              >
                리뷰 전체보기
              </MCommentAll>
            </MBtnWrap>
          </CommentArea>
        </RateReview>
      </Container>
    </Outer>
  );
};

const Outer = styled.div`
  font-family: Noto Sans KR;
  color: ${mainGrey};

  display: flex;
  justify-content: flex-start;
  @media (min-width: 1600px) {
    justify-content: center;
    margin: 0 0 0 -1.5vw;
  }

  width: 100%;

  padding: 0 0 0 1vw;
  @media (max-width: 425px) {
    width: 86vw;
    padding: 0;
    margin: 0 0 0.8em 0;
    // border: 1px solid lime;
  }
  @media (max-width: 375px) {
    margin: 0;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 2em 3em auto auto 2em;
  grid-template-columns: 2vw auto 2vw 350px 3em;

  min-height: 32em;
  @media (max-width: 425px) {
    width: 86vw;
    display: flex;
    flex-direction: column;
  }
`;

const DetailTitle = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
const TitleText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.4em;
  font-weight: 600;

  color: ${mainYellow};
`;
// =================================== Pic
const ImgDiv = styled.div`
  grid-row: 3 / 4;
  grid-column: 2 / 3;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 32vw;
  height: 32vw;
  border-radius: 16px;

  margin: 0 4em 0 0;
  padding: 0 1em 0.5em 0;

  @media (min-width: 1920px) {
    max-width: 620px;
    max-height: 620px;
  }
  @media (max-width: 1320px) {
    min-width: 400px;
    min-height: 400px;
  }
  @media (max-width: 425px) {
    min-width: 86vw;
    min-height: 86vw;
    margin: 1.5em 0 2.5em 0;
    padding: 0;
  }
`;

const Img = styled.img`
  display: flex;
  justify-self: center;
  align-self: center;

  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 8px;

  padding: 2em 0 2em 0;
  @media (max-width: 425px) {
    padding: 1em 0 1em 0;
  }
`;

// =================================== Title
const InfoDiv = styled.div`
  grid-row: 2 / 4;
  grid-column: 4 / 5;

  display: flex;
  flex-direction: column;
`;

const BeerName = styled.p`
  margin: 0 0 0 -0.1em;
  padding: 0 0 0.15em 0;

  font-weight: 600;
  font-size: 1.4em;
  color: ${mainGrey};
`;

// =================================== Ave

const AveFavWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 1em 0 0 0;
  padding: 0;
`;
const SubText = styled.div`
  display: flex;
  justify-content: flex-start;

  font-size: 1.1em;
  // color: ${mainYellow};
`;
const Rate = styled.p`
  display: flex;
  margin: -0.05em 0 0 0.5em;
  padding: 0 0 0 0;

  font-size: 1.14em;
`;

// =================================== Toggle
const FavToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: 0 0 0.2em 0;
  @media (max-width: 425px) {
    padding: 0 0.5em 0 0;
  }
`;
const FavTitle = styled.div``;
const FavWrap = styled.div`
  margin: 0 0 0.1em 0.5em;
`;
const Fav = styled.input`
  display: none;
  &:checked + label {
    background-color: ${mainYellow};
    border-radius: 14px;
  }
  &:checked + label:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
    border-radius: 20px;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    pointer-events: none;
    z-index: -100;
  }
`;
const FavLB = styled.label`
  cursor: pointer;

  display: flex;
  position: relative;
  width: 42px;
  height: 24px;
  background-color: ${mainGrey};
  border-radius: 20px;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    left: 2px;
    bottom: 2px;
    position: absolute;
    background-color: #fff;
    transition: all 0.4s ease;
    border-radius: 100px;
  }
  @media (max-width: 425px) {
    pointer-events: none;
    display: none;
  }
`;
const MFav = styled.input`
  pointer-events: none;
  display: none;
  &:checked + label {
    background-color: ${mainYellow};
    border-radius: 14px;
  }
  &:checked + label:before {
    -webkit-transform: translateX(12px);
    -ms-transform: translateX(12px);
    transform: translateX(12px);
    border-radius: 20px;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    pointer-events: auto;
  }
`;
const MFavLB = styled.label`
  cursor: pointer;

  display: none;
  position: relative;
  width: 32px;
  height: 20px;
  background-color: ${mainGrey};
  border-radius: 20px;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    left: 2px;
    bottom: 2px;
    position: absolute;
    background-color: #fff;
    transition: all 0.4s ease;
    border-radius: 100px;
  }
  @media (max-width: 425px) {
    pointer-events: auto;
    display: flex;
  }
`;

// =================================== Tag Chart
const TagWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1em 0 0 0;
  @media (max-width: 425px) {
    margin: 1em 0 1.6em 0;
  }
`;
const TagSubText = styled(SubText)`
  margin: 0 0.6em 0 0;
`;
const TagEmpty = styled.div`
  margin: 0 0 0.03em 0;
  font-size: 0.95em;
  color: ${lightGrey3};
`;
export const Tag = styled.div`
  cursor: pointer;
  display: flex;
  border-radius: 6px 6px 6px 6px;
  background-color: ${chartYellow2};
  margin: 0 0.7em 0.25em 0;
  padding: 0.5em 0.5em 0.3em 0.5em;
  font-size: 0.92em;
  font-weight: 600;
  color: ${mainGrey};
  &:hover {
    background-color: ${chartAccent2};
  }
`;
const ChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1.2em 0 1.2em 0;
  @media (max-width: 425px) {
    margin: 1.2em 0 2em 0;
  }
`;
const ChartDiv = styled.div`
  display: flex;
  align-self: center;

  margin: 0.8em 0 1.5em 0;
`;
const CompareBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-self: center;
  border: 0px;
  border-radius: 8px;
  margin: 0 0 1em 0.5em;
  padding: 0.45em 0.8em 0.4em 0.8em;
  font-size: 1.1em;
  background-color: ${mainYellow};
  color: #fff;
  &: hover {
    background-color: ${accent};
    color: white;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    pointer-events: none;
    display: none;
  }
`;
const MCompareBtn = styled.button`
  pointer-events: none;
  cursor: pointer;
  display: none;
  align-self: center;
  border: 0px;
  border-radius: 8px;
  margin: 0 0 1em 0.5em;
  padding: 0.45em 0.8em 0.4em 0.8em;
  font-size: 1.1em;
  background-color: ${mainYellow};
  color: #fff;
  &: hover {
    background-color: ${accent};
    color: white;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    pointer-events: auto;
    display: flex;
    margin: 0.7em 0 1em 0.5em;
  }
`;
// =================================== Tab
const InfoBody = styled.div`
  display: flex;
  padding: 0 0 0 0.3em;
  @media (max-width: 425px) {
    justify-content: center;
    padding: 0;
    margin: 0 0 0.2em 0;
  }
`;
const TabDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 95%;
  @media (max-width: 425px) {
    width: 97%;
  }
`;
const TabWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 2em;
`;
const Divider = styled.p`
  @media (max-width: 425px) {
    font-size: 1.2em;
  }
`;
const Tab = styled.div`
  cursor: pointer;
  display: flex;
  align-self: center;
  align-items: center;
  z-index: 1; // border 여부에 따라 변경
  height: 1.7em;
  background-color: ${tabColor};
  border-bottom: 0px;
  border-radius: 8px 8px 0 0;
  margin: 0 0 -0.35em 0;
  padding: 1em 0.5em 0.8em 0.5em;
  font-size: 0.95em;
  font-weight: 500;
  color: #fff;
  &:hover {
    font-weight: 400;
    background: ${btnOff};
  }
  @media (max-width: 425px) {
    padding: 1.1em 0.7em 0.85em 0.7em;
    font-size: 1em;
  }
`;

// =================================== Tab: DESCRIPTION
const InfoDetailWrap = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  z-index: 1;
  min-height: 10em;
  border-radius: 0 8px 8px 8px;
  background-color: ${lightGrey2};
  @media (max-width: 425px) {
    min-height: 10.5em;
  }
`;
const InfoDetail1 = styled.div`
  display: flex;
  padding: 0.8em 0.7em 0 0.7em;
  width: 100%;
  font-size: 0.95em;
  line-height: 1.5;
  @media (max-width: 425px) {
    font-size: 1.05em;
  }
`;
const InfoDetail2 = styled.div`
  display: flex;
  padding: 0.8em 0.7em 0 0.7em;
  width: 100%;
  font-size: 0.95em;
  line-height: 1.5;
  @media (max-width: 425px) {
    font-size: 1.05em;
  }
`;
const InfoDetail3 = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0.9em 0 0 0.7em;
  font-size: 0.95em;
  @media (max-width: 425px) {
    font-size: 1.05em;
  }
`;
const PWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2em 0 0;
`;
const Source = styled.div`
  display: flex;
  align-self: flex-end;
  font-size: 0.8em;
  font-weight: 400;
  color: ${lightGrey3};
  margin: 0.5em 0.3em 0 0;
  opacity: 0.8;
`;
// =================================== Tab: TEXT
const PT = styled.p`
  display: flex;
  margin: 0 0 0.7em 0;
  padding: 0;
  font-weight: 400;
  color: ${pDefault};
`;

const P = styled.p`
  display: flex;
  margin: 0 0 0.7em 0;
  padding: 0;
  color: ${pDefault};
`;

// =================================== Rate & Review
const RateReview = styled.div`
  grid-row: 4 / 5;
  grid-column: 2 / 5;
  margin: 2em 0 0 0;
`;
const RatingArea = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0.6em 0.5em;
  @media (max-width: 425px) {
    margin: 0 0 0.8em 0.2em;
  }
`;
const UserRate = styled.p`
  display: flex;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 1.2em;
  color: ${mainYellow};
`;
export const Stars = styled.div`
  display: flex;
  margin: 0 0 0 0.5em;
  padding: 0 0 0.3em 0;
`;
export const StarWrap = styled.div`
  cursor: pointer;
  display: flex;
  margin: 0 0.1em 0 0;
  @media (max-width: 425px) {
    pointer-events: none;
    display: none;
  }
`;
export const MStarWrap = styled.div`
  pointer-events: none;
  display: none;
  cursor: pointer;
  margin: 0 0.1em 0 0;
  @media (max-width: 425px) {
    pointer-events: auto;
    display: flex;
  }
`;
export const FStar = styled(FaStar)`
  width: 1.4em;
  height: 1.4em;
  color: ${mainYellow};
`;
export const EStar = styled(FaRegStar)`
  width: 1.4em;
  height: 1.4em;
  color: ${mainYellow};
`;
const CommentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  width: 100%;
  margin: 0;
  padding: 0;
`;
const List = styled.div`
  display: flex;
  justify-content: flex-start;
  // max-width: 800px;
  width: 100%;
  margin: 0 0 1.2em 0;
  @media (max-width: 425px) {
    margin: 0 0.5em 1.2em 0.5em;
    overflow-x: scroll;
  }
`;
const WriteComment = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;

  margin: 0 0 0.1em 0.5em;
  padding: 0.4em 0.6em 0.35em 0.6em;

  background-color: ${mainYellow};
  color: #fff;

  &: hover {
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
const MBtnWrap = styled.div`
  display: none;
  @media (max-width: 425px) {
    display: flex;
    align-self: flex-end;
  }
`;
const MWriteComment = styled.button`
  pointer-events: none;
  display: none;
  border: 0px;
  border-radius: 8px;

  background-color: ${mainYellow};
  color: #fff;

  &: hover {
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
    margin: 0 0.5em 0 0;
    padding: 0.4em 0.6em 0.35em 0.6em;
  }
`;
const CommentAll = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;

  margin: 0 0.2em 0 0;
  padding: 0.4em 0.6em 0.35em 0.6em;

  background-color: ${mainYellow};
  color: #fff;

  &: hover {
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
const MCommentAll = styled.button`
  pointer-events: none;
  display: none;
  border: 0px;
  border-radius: 8px;

  background-color: ${mainYellow};
  color: #fff;

  &: hover {
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
    margin: 0 0.5em 0 0;
    padding: 0.4em 0.6em 0.35em 0.6em;
  }
`;
