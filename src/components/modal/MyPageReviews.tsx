import React from 'react';
import styled from 'styled-components';

import { MDMyPageReviewsProps } from '../../containers/modal/MyPageReviewsContainer';
import {
  BeerName,
  MainWrap,
  Comment,
  ReviewRate,
  DateString,
  RateWrap,
  URStar,
  UserRate,
  ResultEmpty,
} from '../../containers/modal/ModalContainer';
import { MyReview } from '../../modules/user';

import {
  mainGreyOpac,
  mainYellow,
  mainYellowOpac,
} from '../../components/nav/color';

export const MDMyPageAllRates = ({
  myReviews,
  setDateForm,
}: MDMyPageReviewsProps): JSX.Element => {
  return myReviews.length !== 0 ? (
    <>
      {myReviews.map((ele: MyReview) => (
        <ModalSingleCommentM1
          key={`myReview${myReviews.indexOf(ele)}`}
          className='singleComment'
        >
          <MainWrap className='commentWrap'>
            <CommentTopM1 className='commentTop'>
              <MyRatesImgDiv>
                <MyRatesImg className='beerThumbnail' src={ele.beer_img} />
              </MyRatesImgDiv>
              <BeerName className='beerName'>{ele.beer_name}</BeerName>
            </CommentTopM1>
          </MainWrap>
          <MyRatesReviewRate>
            <MyRatesDateString>{setDateForm(ele.createdAt)}</MyRatesDateString>
            <MyRatesRateWrap className='rateWrap'>
              <URStar className='userRateStar' />
              <UserRate className='userRate'>{ele.rate}</UserRate>
            </MyRatesRateWrap>
          </MyRatesReviewRate>
        </ModalSingleCommentM1>
      ))}
    </>
  ) : (
    <ResultEmpty>작성한 리뷰가 없습니다.</ResultEmpty>
  );
};

export const MDMyPageAllReviews = ({
  myReviews,
  setDateForm,
}: MDMyPageReviewsProps): JSX.Element => {
  return myReviews.length !== 0 ? (
    <>
      {myReviews.map((ele: MyReview) => (
        <ModalSingleCommentM2
          key={`myReview${myReviews.indexOf(ele)}`}
          className='singleComment'
        >
          <MainWrap className='commentWrap'>
            <CommentTopM2 className='commentTop'>
              <BeerName className='beerName'>{ele.beer_name}</BeerName>
            </CommentTopM2>
            <Comment className='comment'>{ele.comment}</Comment>
          </MainWrap>
          <ReviewRate>
            <DateString>{setDateForm(ele.createdAt)}</DateString>
            <RateWrap className='rateWrap'>
              <URStar className='userRateStar' />
              <UserRate className='userRate'>{ele.rate}</UserRate>
            </RateWrap>
          </ReviewRate>
        </ModalSingleCommentM2>
      ))}
    </>
  ) : (
    <ResultEmpty>작성한 리뷰가 없습니다.</ResultEmpty>
  );
};

const SingleComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 200px;
  min-width: 200px;

  border: 2px solid ${mainYellow};
  border-radius: 8px;

  margin: 0.5em 0.4em 1em 0.4em;
  padding: 0.6em;
`;
const ModalSingleCommentM1 = styled(SingleComment)`
  width: 31%;
  height: 250px;
  max-width: 230px;

  margin: 0.5em 0.5em 1em 0.5em;
  padding: 0.6em;
  @media (max-width: 425px) {
    width: 47vw;
    height: 270px;
    min-width: 0;
    border: 2px solid ${mainYellowOpac};
    margin: 0.5em auto 1em auto;
  }
`;
const ModalSingleCommentM2 = styled(SingleComment)`
  width: 31%;
  height: 200px;
  max-width: 230px;

  margin: 0.5em 0.5em 1em 0.5em;
  padding: 0.6em;
  @media (max-width: 425px) {
    width: 90vw;
    max-width: 90vw;
    min-height: 130px;
    height: 20vh;
    border: 2px solid ${mainYellowOpac};
    margin: 0.5em auto 0.5em auto;
  }
`;

const CommentTopM1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const CommentTopM2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin: 0.4em 0 0.7em 0;
`;
const MyRatesImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;

  // border: 2px solid ${mainYellowOpac};
  border-radius: 16px;
  overflow: hidden;

  margin: 0.2em 0 1em 0;
`;
const MyRatesImg = styled.img`
  display: flex;
  height: 140px;
`;

const MyRatesReviewRate = styled.div`
  grid-row: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.1em 0 0.1em;
  @media (max-width: 425px) {
    flex-direction: column;
    margin: 0.2em 0 0 0;
  }
`;
const MyRatesDateString = styled.div`
  display: flex;

  margin: 0.15em 0 0 0.2em;

  font-size: 0.9em;
  color: ${mainGreyOpac};

  @media (max-width: 425px) {
    font-size: 0.85em;
    margin: 0.15em 0 0.3em 0.2em;
  }
`;
const MyRatesRateWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  align-self: center;
  margin: 0.1em 0 0 0;
  @media (max-width: 425px) {
    align-self: flex-end;
  }
`;
