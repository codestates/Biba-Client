import React from 'react';
import styled from 'styled-components';

import { MDDetailAllReviewsProps } from '../../containers/modal/DetailAllReviewsContainer';
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
  UserWrap,
  PIcon,
  ProfileWrap,
  Profile,
  Nickname,
} from '../../containers/modal/ModalContainer';
import { aReview } from '../../modules/beerdetail';

import { mainYellow, mainYellowOpac } from '../../components/nav/color';

export const MDDetailAllReviews = ({
  allReviews,
  setDateForm,
}: MDDetailAllReviewsProps): JSX.Element => {
  return allReviews.length !== 0 ? (
    <>
      {allReviews.map((ele: aReview) => (
        <ModalSingleCommentA
          key={`review${allReviews.indexOf(ele)}`}
          className='singleComment'
        >
          <MainWrap className='commentWrap'>
            <CommentTopA className='commentTop'>
              <UserWrap className='userWrap'>
                {ele.profile === '' || ele.profile === undefined ? (
                  <PIcon />
                ) : (
                  <ProfileWrap>
                    <Profile
                      className='profile'
                      src={ele.profile}
                      alt='profile'
                    />
                  </ProfileWrap>
                )}
                <Nickname className='nickname'>{ele.nickname}</Nickname>
              </UserWrap>
            </CommentTopA>
            <Comment className='comment'>{ele.comment}</Comment>
          </MainWrap>
          <ReviewRate>
            <DateString>{setDateForm(ele.createdAt)}</DateString>
            <RateWrap className='rateWrap'>
              <URStar className='userRateStar' />
              <UserRate className='userRate'>{ele.rate}</UserRate>
            </RateWrap>
          </ReviewRate>
        </ModalSingleCommentA>
      ))}
    </>
  ) : (
    <ResultEmpty>작성된 리뷰가 없습니다.</ResultEmpty>
  );
};
const ModalSingleCommentA = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 31%;
  height: 200px;
  max-width: 230px;
  min-width: 200px;

  border: 2px solid ${mainYellow};
  border-radius: 8px;

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
const CommentTopA = styled.div`
  grid-row: 1 / 2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
