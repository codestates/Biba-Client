import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { FaStar } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';

import { LoginContainerWithRouter } from '../user/LoginContainer';
import { MDChangeNicknameContainer } from './ChangeNicknameContainer';
import {
  MDMyPageAllRatesContainer,
  MDMyPageAllReviewsContainer,
} from './MyPageReviewsContainer';
import { MDMyBeerListContainer } from './MyBeerListContainer';
import { MDUsersReviewContainer } from './UsersReviewContainer';
import { MDDetailAllReviewsContainer } from './DetailAllReviewsContainer';
import { MDRequestBeerContainer } from './RequestBeerContainer';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';
import { aReview } from '../../modules/beerdetail';

import { Modal } from '../../components/modal/Modal';

import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
} from '../../components/nav/color';

import { MyReview, User } from '../../modules/user';

export interface ModalProps {
  display: boolean;
  closeModal(): void;
  user_review: boolean;
  contentType: ContentType;
  content: JSX.Element | JSX.Element[];
  myReviews: MyReview[];
  allReviews: aReview[];
}

export interface ModalContentProps {
  userData: User;
  isLogin: boolean;
  token: string;
  handleModal(contentType: ContentType, display: boolean): void;
  closeModal(): void;
}
export interface ReviewModalContentProps extends ModalContentProps {
  setDateForm(input: string): string;
}

export const ModalContainer = (): JSX.Element => {
  // modal이 필요한 각 페이지에서 상황에 맞게 dispatch
  // 1. modal display -> true, false 지정
  // 2. 어떤 콘텐츠가 나와야하는지에 따라 ContentType 지정
  const { contentType, display } = useSelector(
    (state: RootState) => state.modal,
  );
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { myReviews } = useSelector((state: RootState) => state.myReviews);
  const { user_review, user_star, user_input, user_rate } = useSelector(
    (state: RootState) => state.userReview,
  );
  const { allReviews } = useSelector((state: RootState) => state.allReviews);

  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const closeModal = (): void => {
    handleModal(ContentType.Empty, false);
  };
  const setDateForm = (input: string): string => {
    const [date, time] = input.split(' ');
    const dateOutput = date.replace('-', '년 ').replace('-', '월 ') + '일';
    const timeOutput = time.slice(0, 5);
    return `${dateOutput} ${timeOutput}`;
  };

  const content = (contentType: ContentType): JSX.Element => {
    if (contentType === ContentType.Empty) {
      return <></>;
    }
    if (contentType === ContentType.Login) {
      return <LoginContainerWithRouter />;
    }
    if (contentType === ContentType.ChangeNickname) {
      return (
        <MDChangeNicknameContainer
          userData={userData}
          isLogin={isLogin}
          token={token}
          handleModal={handleModal}
          closeModal={closeModal}
        />
      );
    }
    if (contentType === ContentType.MyPageAllRates) {
      return (
        <MDMyPageAllRatesContainer
          userData={userData}
          isLogin={isLogin}
          token={token}
          handleModal={handleModal}
          closeModal={closeModal}
          setDateForm={setDateForm}
        />
      );
    }
    if (contentType === ContentType.MyPageAllReviews) {
      return (
        <MDMyPageAllReviewsContainer
          userData={userData}
          isLogin={isLogin}
          token={token}
          handleModal={handleModal}
          closeModal={closeModal}
          setDateForm={setDateForm}
        />
      );
    }
    if (contentType === ContentType.MyBeerList) {
      return (
        <MDMyBeerListContainer
          userData={userData}
          isLogin={isLogin}
          token={token}
          handleModal={handleModal}
          closeModal={closeModal}
        />
      );
    }
    if (contentType === ContentType.UsersReview) {
      return (
        <MDUsersReviewContainer
          userData={userData}
          isLogin={isLogin}
          token={token}
          handleModal={handleModal}
          closeModal={closeModal}
        />
      );
    }
    if (contentType === ContentType.DetailAllReviews) {
      return (
        <MDDetailAllReviewsContainer
          userData={userData}
          isLogin={isLogin}
          token={token}
          handleModal={handleModal}
          closeModal={closeModal}
          setDateForm={setDateForm}
        />
      );
    }
    if (contentType === ContentType.RequestBeer) {
      return (
        <MDRequestBeerContainer
          userData={userData}
          isLogin={isLogin}
          token={token}
          handleModal={handleModal}
          closeModal={closeModal}
        />
      );
    }
    return <div></div>;
  };

  return (
    <Modal
      display={display}
      closeModal={closeModal}
      // pressEsc={pressEsc}
      user_review={user_review}
      contentType={contentType}
      content={content(contentType)}
      myReviews={myReviews}
      allReviews={allReviews}
    />
  );
};

export const ModalContainerWithRouter = withRouter(ModalContainer);

export const SingleComment = styled.div`
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
export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BeerName = styled.div`
  display: inline-block;

  width: 200px;
  margin: 0 0 0.25em 0;

  font-size: 1em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  // word-wrap: break-word;
  // clear: both;
`;
export const UserWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin: 0 0 0.4em 0;
`;
export const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.4em;
  height: 1.4em;

  margin: 0 0.5em 0 0;
  border-radius: 50%;
  overflow: hidden;
`;
export const Profile = styled.img`
  height: 150%;
  width: 150%;
  object-fit: contain;
`;
export const PIcon = styled(BiUserCircle)`
  display: flex;

  width: 1.9em;
  height: 1.9em;

  margin: 0 0.2em 0 0;
  color: ${mainYellowOpac};
`;
export const Nickname = styled.div`
  display: flex;

  padding: 0.2em 0 0 0;

  font-size: 0.95em;
`;
export const ReviewRate = styled.div`
  grid-row: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.1em 0 0.1em;
`;
export const DateString = styled.div`
  display: flex;

  margin: 0.15em 0 0 0.2em;

  font-size: 0.9em;
  color: ${mainGreyOpac};
`;
export const RateWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  align-self: center;
  margin: 0.1em 0 0 0;
`;
export const URStar = styled(FaStar)`
  display: flex;

  width: 1.1em;
  height: 1.1em;
  margin: 0 0.3em 0 0;
  color: ${mainYellow};
`;
export const UserRate = styled.div`
  display: flex;
  padding: 0.05em 0.2em 0 0;
  font-size: 1.1em;
  color: ${mainYellow};
`;
export const Comment = styled.div`
  grid-row: 2 / 3;
  display: flex;

  margin: 0 0 0 0.2em;
  font-size: 0.9em;
  line-height: 1.2;

  color: ${mainGrey};
`;
export const ResultEmpty = styled.div`
  display: flex;
  align-items: center;

  height: 150px;
`;
export const Radio = styled.input`
  cursor: pointer;

  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${mainGrey};
  border-radius: 50%;
  outline: none;

  margin: 0 0.3em 0.3em 0;

  background: #fff;

  &:before {
    content: '';
    display: flex;
    width: 60%;
    height: 60%;
    margin: 20% auto;
    border-radius: 50%;
  }
  &:checked:before {
    background: ${mainYellow};
  }
  &:checked:hover:before {
    background: ${mainGrey};
  }
  &:focus {
    outline: none;
  }
`;
export const RadioOption = styled.div`
  cursor: pointer;
  display: flex;

  color: ${mainGrey};
`;
