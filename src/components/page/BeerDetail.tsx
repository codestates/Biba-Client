import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import { BeerDetailProps } from '../../containers/page/BeerDetailContainer';
import { Chart } from '../../containers/page/radar';
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

export const BeerDetail = ({
  match,
  beerDetail,
  bookmark,
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
  mainReviewList,
  handleClickAllReviews,
}: BeerDetailProps): JSX.Element => {
  return (
    <Outer className='detailOuter'>
      <Container className='detailContainer'>
        <InfoTitle className='infoTitle'>
          <TitleText>맥주 상세 정보</TitleText>
        </InfoTitle>
        <ImgDiv>
          <Img className='infoImg' src={beerDetail.beer_img} alt='' />
        </ImgDiv>
        <InfoDiv className='infoDiv'>
          <BeerName className='beerName'>{beerDetail.beer_name}</BeerName>
          <InfoSub className='infoSub'>
            <AveFavWrap>
              <Average className='beerAverage'>
                별점 평균
                <Rate>{beerDetail.rate}</Rate>
              </Average>
              <FavToggle className='favToggle'>
                <FavTitle>즐겨찾기</FavTitle>
                <FavWrap className='favWrap'>
                  <Fav
                    id='favToggle'
                    type='checkbox'
                    onChange={() => handleBookmark()}
                    checked={bookmark}
                  ></Fav>
                  <FavLB htmlFor='favToggle'></FavLB>
                </FavWrap>
              </FavToggle>
            </AveFavWrap>
            <TagWrap>{handleTag()}</TagWrap>

            <InfoChart>{Chart()}</InfoChart>
          </InfoSub>
          <InfoBody className='infoBody'>
            <TabWrap className='infoTabWrap'>
              <Tab
                id='basic'
                className='infoTab'
                onClick={handleInfoTab}
                style={
                  disBasic
                    ? tabBasic
                      ? { fontWeight: 500 }
                      : {
                          background: `${btnOff}`,
                          color: `${btnOffText}`,
                          fontWeight: 400,
                        }
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
                      ? { fontWeight: 500 }
                      : {
                          background: `${btnOff}`,
                          color: `${btnOffText}`,
                          fontWeight: 400,
                        }
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
                style={
                  tabMore
                    ? { fontWeight: 500 }
                    : {
                        background: `${btnOff}`,
                        color: `${btnOffText}`,
                        fontWeight: 400,
                      }
                }
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
          </InfoBody>
        </InfoDiv>
        <RateReview className='rateReview'>
          <RatingArea className='ratingArea'>
            <UserRate className='rate'>별점 주기</UserRate>
            <Stars className='stars'>{handleStar()}</Stars>
            <WriteComment
              className='commentBtn'
              onClick={handleClickUsersReview}
            >
              {user_review ? `리뷰 수정하기` : `리뷰 작성하기`}
            </WriteComment>
          </RatingArea>
          <CommentArea className='commentArea'>
            <List className='commentList'>{mainReviewList()}</List>
            <CommentAll
              className='commentAllBtn'
              onClick={handleClickAllReviews}
            >
              리뷰 전체보기
            </CommentAll>
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
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 2em 3em auto auto 2em;
  grid-template-columns: 2vw auto 2vw 350px 3em;

  min-height: 32em;
`;

const InfoTitle = styled.div`
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

  background-color: #fff;
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
  @media (max-width: 1320px) {
    min-width: 400px;
    min-height: 400px;
  }
  @media (min-width: 1920px) {
    max-width: 620px;
    max-height: 620px;
  }

  // border: 2px solid ${mainGrey};
  border-radius: 16px;
  // background-color: ${mainYellowOpac};

  margin: 0 4em 0 0;
  padding: 0 1em 0.5em 0;
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
`;

// =================================== Title
const InfoDiv = styled.div`
  grid-row: 2 / 4;
  grid-column: 4 / 5;

  display: flex;
  flex-direction: column;
`;

const BeerName = styled.p`
  margin: 0;
  padding: 0 0 0.15em 0;

  // font-weight: 300;
  font-size: 1.25em;
  // color: ${mainYellow};
`;

// =================================== Ave

const InfoSub = styled.div`
  display: flex;
  flex-direction: column;
`;
const AveFavWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0.5em 0 0.6em 0;
  padding: 0;
`;
const Average = styled.div`
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
`;

// =================================== Tag Chart
const TagWrap = styled.div`
  display: flex;
  justify-content: flex-start;

  margin: 0 0 2em 0;
`;
export const Tag = styled.p`
  display: flex;

  // border: 1px solid ${mainYellow};
  border-radius: 6px 6px 6px 6px;
  background-color: ${mainYellowOpac};

  margin: 0 0.7em 0 0;
  padding: 0.5em 0.5em 0.3em 0.5em;

  font-size: 0.9em;
  font-weight: 500;
  color: #212121;
`;

const InfoChart = styled.div`
  display: flex;

  margin: 0 0 2em 0;
`;

// =================================== Tab
const InfoBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TabWrap = styled.div`
  display: flex;
  justify-content: space-evenly;

  height: 2em;
`;

const Divider = styled.p``;
const Tab = styled.div`
  cursor: pointer;

  display: flex;
  align-self: center;
  align-items: center;

  z-index: 1; // border 여부에 따라 변경

  height: 1.7em;

  background-color: ${mainYellow};
  // border: 2px solid ${mainGrey};
  border-bottom: 0px;
  border-radius: 8px 8px 0 0;

  margin: 0 0 -0.35em 0;
  padding: 1em 0.5em 0.8em 0.5em;

  font-size: 0.95em;
  color: #fff;
`;

// =================================== Tab: DESCRIPTION

const InfoDetailWrap = styled.div`
  display: flex;

  // width: 20em;
  width: 95%;
  height: auto;
  min-height: 10em;

  // border: 2px solid ${mainGrey};
  border-radius: 0 8px 8px 8px;

  // background-color: ${lightGrey1};
  background-color: ${mainYellowOpac};
`;
const InfoDetail1 = styled.div`
  display: flex;

  padding: 0.8em 0.7em 0 0.7em;

  font-size: 0.95em;
  line-height: 1.5;
`;
const InfoDetail2 = styled.div`
  display: flex;

  padding: 0.8em 0.7em 0 0.7em;

  font-size: 0.95em;
  line-height: 1.5;
`;
const InfoDetail3 = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.9em 0 0 0.7em;

  font-size: 0.95em;
`;
const PWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 2em 0 0;
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
`;
const RatingArea = styled.div`
  display: flex;
  align-items: center;
`;
const UserRate = styled.p``;
const Stars = styled.div`
  display: flex;

  margin: 0 0 0 0.5em;
  padding: 0 0 0.3em 0;
`;

export const StarWrap = styled.div`
  cursor: pointer;
  display: flex;

  margin: 0 0.1em 0 0;
`;
export const FStar = styled(FaRegStar)`
  width: 1.2em;
  height: 1.2em;
  color: ${mainYellow};
`;
export const EStar = styled(FaStar)`
  width: 1.2em;
  height: 1.2em;
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
`;

const WriteComment = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;
  background-color: ${mainYellow};
  color: #fff;

  margin: 0 0 0.1em 0.5em;
  padding: 0.4em 0.6em 0.35em 0.6em;

  &: hover {
    background-color: ${mainGrey};
    color: white;
  }
  &:focus {
    outline: none;
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
`;
