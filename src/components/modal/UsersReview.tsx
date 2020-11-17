import React from 'react';
import styled from 'styled-components';

import { MDUsersReviewProps } from '../../containers/modal/UsersReviewContainer';

import { Stars } from '../../components/page/BeerDetail';
import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  accent,
  lightGrey3,
} from '../../components/nav/color';

export const MDUsersReview = ({
  user_review,
  user_star,
  user_input,
  inputValues,
  handleReviewOnChange,
  handleStar,
  handleResetStar,
  handleClickSubmitReview,
  handleClickDeleteReview,
}: MDUsersReviewProps): JSX.Element => {
  return (
    <ReviewWrap className='reviewWrap'>
      <RateStarsWrap>
        <RateTitle className='rate'>별점</RateTitle>
        <Stars className='stars'>{handleStar()}</Stars>
        <DeleteStarBtn
          onClick={handleResetStar}
          style={user_star ? {} : { display: 'none' }}
        >
          별점 삭제
        </DeleteStarBtn>
      </RateStarsWrap>
      <ReviewTextAreaWrap>
        <ReviewTextArea
          name='review'
          defaultValue={user_review ? user_input : inputValues.review}
          onChange={handleReviewOnChange}
          maxLength={100}
          rows={4}
          placeholder='리뷰를 작성해주세요.'
          wrap='hard'
        ></ReviewTextArea>
        <UserReviewBtnArea>
          <UserReviewBtn onClick={handleClickSubmitReview}>
            {user_review ? `수정하기` : `등록하기`}
          </UserReviewBtn>
          {user_review ? (
            <UserReviewBtn onClick={handleClickDeleteReview}>
              삭제하기
            </UserReviewBtn>
          ) : undefined}
        </UserReviewBtnArea>
      </ReviewTextAreaWrap>
    </ReviewWrap>
  );
};

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 90%;
`;
const RateStarsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0.2em 0 0.5em 0;
`;
const RateTitle = styled.div`
  margin: 0 0 0.12em 0.2em;
  font-size: 1.1em;

  color: ${mainGrey};
  @media (max-width: 425px) {
    font-size: 1.05em;
    margin: 0 0 0.03em 0.5em;
  }
`;
const ReviewTextAreaWrap = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
const ReviewTextArea = styled.textarea`
  resize: none;
  border: 2px solid ${mainYellow};
  border-radius: 8px;

  width: 80%;

  padding: 0.5em 0.4em 0.5em 0.4em;
  line-height: 1.5;
  font-size: 0.95em;

  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    width: 97%;
    align-self: center;
  }
`;
const UserReviewBtnArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media (max-width: 425px) {
    flex-direction: row;
    justify-content: flex-end;
    margin: 0.6em 0 0 0;
    padding: 0 0.2em 0 0;
  }
`;

const UserReviewBtn = styled.button`
  cursor: pointer;

  display: flex;
  align-self: flex-end;

  border: 0px;
  border-radius: 8px;

  margin: 0 0 0.3em 0.5em;
  padding: 0.5em 0.6em 0.35em 0.6em;

  font-size: 0.95em;
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

const DeleteStarBtn = styled.button`
  cursor: pointer;

  display: inline-block;
  width: 5em;
  height: 1.8em;
  border: 1.5px solid ${mainYellowOpac};
  border-radius: 4px;

  margin: 0 0 0.15em 0.4em;
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
  @media (max-width: 425px) {
    margin: 0 0 0.08em 0.4em;
  }
`;
