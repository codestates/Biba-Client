import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';

import { MDChangeNicknameContainer } from './ChangeNicknameContainer';
import { MDMyBeerListContainer } from './MyBeerListContainer';
import { MDUsersReviewContainer } from './UsersReviewContainer';

import { LoginContainerWithRouter } from '../user/LoginContainer';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';
import { aReview } from '../../modules/beerdetail';

import { Modal } from '../../components/modal/Modal';

import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  accent,
  lightGrey3,
} from '../../components/nav/color';
import { Content } from '../../components/user/Mypage';
import {
  Tag,
  Stars,
  StarWrap,
  FStar,
  EStar,
} from '../../components/page/BeerDetail';

import { MyReview, User } from '../../modules/user';

export interface ModalProps {
  display: boolean;
  closeModal(): void;
  // pressEsc(e: React.KeyboardEvent<HTMLInputElement>): void;
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

export interface ModalReviewContentProps extends ModalContentProps {
  setDateForm(input: string): string;
}

export const ModalContainer = (): JSX.Element => {
  // modal이 필요한 각 페이지에서 상황에 맞게 dispatch
  // 1. modal display -> true, false 지정
  // 2. 어떤 콘텐츠가 나와야하는지에 따라 ContentType 지정
  // === user
  const { contentType, display } = useSelector(
    (state: RootState) => state.modal,
  );
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );

  const { myReviews } = useSelector((state: RootState) => state.myReviews);
  // === detail

  const { user_review, user_star, user_input, user_rate } = useSelector(
    (state: RootState) => state.userReview,
  );
  const { allReviews } = useSelector((state: RootState) => state.allReviews);
  // === request
  const { request1, request2 } = useSelector(
    (state: RootState) => state.beerRequest,
  );

  const dispatch = useDispatch();
  // ================================================================ Modal 함수
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const closeModal = (): void => {
    handleModal(ContentType.Empty, false);
  };
  // const pressEsc = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  //   if (e.key === 'ESC') closeModal();
  // };

  const [inputValues, setInputValues] = useState({
    // nickname: '',
    // review: '',
    beerName: '',
    beerRequest: '',
  });

  // const handleInputOnChange = (
  //   e:
  //     | React.ChangeEvent<HTMLTextAreaElement>
  //     | React.ChangeEvent<HTMLInputElement>,
  // ): void => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setInputValues({ ...inputValues, [name]: value });
  // };

  const setDateForm = (input: string): string => {
    const [date, time] = input.split(' ');
    const dateOutput = date.replace('-', '년 ').replace('-', '월 ') + '일';
    const timeOutput = time.slice(0, 5);
    return `${dateOutput} ${timeOutput}`;
  };

  // ================================================================ Beer Request 함수
  const handleRequestType = (request1: boolean, request2: boolean): void => {
    dispatch({ type: 'SET_REQUESTTYPE', request1, request2 });
  };
  const handleRadioSelect1 = (): void => {
    handleRequestType(true, false);
  };
  const handleRadioSelect2 = (): void => {
    handleRequestType(false, true);
  };
  const handleClickSubmitRequest = (): void => {
    // console.log(inputValues, request1, request2);
    if (inputValues.beerName !== '' && inputValues.beerRequest !== '') {
      if (request1) {
        axios
          .post(`https://beer4.xyz/report/recommend`, {
            token: token,
            comment: inputValues.beerRequest,
            beer_name: inputValues.beerName,
          })
          .then((res) => {
            if (res.status === 201) {
              setInputValues({ ...inputValues, beerName: '', beerRequest: '' });
              alert(`맥주 추천이 완료되었습니다. Biba!`);
              return closeModal();
            } else {
              alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
              return closeModal();
            }
          })
          .catch(() => {
            alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
            return closeModal();
          });
      } else if (request2) {
        axios
          .post(`https://beer4.xyz/report/request`, {
            token: token,
            comment: inputValues.beerRequest,
            beer_name: inputValues.beerName,
          })
          .then((res) => {
            if (res.status === 201) {
              setInputValues({ ...inputValues, beerName: '', beerRequest: '' });
              alert(`맥주 요청이 완료되었습니다. Biba!`);
              return closeModal();
            } else {
              alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
              return closeModal();
            }
          })
          .catch(() => {
            return alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
          });
      }
    }
    if (inputValues.beerName === '') {
      return alert(`맥주 이름을 작성해주세요.`);
    } else if (inputValues.beerRequest === '') {
      return alert(`내용을 작성해주세요.`);
    }
  };
  // ================================================================ Content ============
  const content = (contentType: ContentType): JSX.Element | JSX.Element[] => {
    // ==================================================== empty
    if (contentType === ContentType.Empty) {
      return <></>;
    }
    // ==================================================== login
    if (contentType === ContentType.Login) {
      return <LoginContainerWithRouter />;
    }
    // ==================================================== change nickname
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
    // ==================================================== my beer list
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
    // ==================================================== add review
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
    // ==================================================== mypage all reviews
    if (contentType === ContentType.MyPageAllRates) {
      return myReviews.length !== 0 ? (
        myReviews.map((ele: MyReview) => (
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
            <ReviewRate>
              <DateString>{setDateForm(ele.createdAt)}</DateString>
              <RateWrap className='rateWrap'>
                <URStar className='userRateStar' />
                <UserRate className='userRate'>{ele.rate}</UserRate>
              </RateWrap>
            </ReviewRate>
          </ModalSingleCommentM1>
        ))
      ) : (
        <ResultEmpty>작성한 리뷰가 없습니다.</ResultEmpty>
      );
    }
    if (contentType === ContentType.MyPageAllReviews) {
      return myReviews.length !== 0 ? (
        myReviews.map((ele: MyReview) => (
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
        ))
      ) : (
        <ResultEmpty>작성한 리뷰가 없습니다.</ResultEmpty>
      );
    }

    // ==================================================== all reviews
    if (contentType === ContentType.AllReviews) {
      return allReviews.length !== 0 ? (
        allReviews.map((ele: aReview) => (
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
        ))
      ) : (
        <ResultEmpty>작성된 리뷰가 없습니다.</ResultEmpty>
      );
    }
    // ==================================================== request beer
    if (contentType === ContentType.RequestBeer) {
      return (
        <RequestBeerModal className='requestBeerModal'>
          <RadioArea className='radioArea'>
            <RadioWrap className='radioWrap'>
              <Radio
                id='request1'
                type='radio'
                name='requestBeer'
                value='마셔본 맥주 추천'
                checked={request1}
                onChange={handleRadioSelect1}
              />
              <RadioOption onClick={handleRadioSelect1}>
                마셔본 맥주 추천
              </RadioOption>
            </RadioWrap>
            <RadioWrap className='radioWrap'>
              <Radio
                id='request2'
                type='radio'
                name='requestBeer'
                value='이 맥주가 궁금해요'
                checked={request2}
                onChange={handleRadioSelect2}
              />
              <RadioOption onClick={handleRadioSelect2}>
                이 맥주가 궁금해요
              </RadioOption>
            </RadioWrap>
          </RadioArea>
          <RequestTitleArea className='requestTitleArea'>
            <Subtitle className='subtitle'>맥주 이름</Subtitle>
            <RequestTitle
              name='beerName'
              defaultValue={inputValues.beerName}
              // onChange={handleInputOnChange}
              placeholder='맥주 이름을 작성해주세요.'
            />
          </RequestTitleArea>
          <RequestBodyArea className='requestBodyArea'>
            <Subtitle className='subtitle'>내용</Subtitle>
            <RequestBody
              name='beerRequest'
              defaultValue={inputValues.beerRequest}
              // onChange={handleInputOnChange}
              maxLength={100}
              rows={4}
              placeholder='내용을 작성해주세요.'
              wrap='hard'
            />
          </RequestBodyArea>
          <RequestSubmitBtn onClick={handleClickSubmitRequest}>
            요청하기
          </RequestSubmitBtn>
        </RequestBeerModal>
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
`; // 하나의 코멘트 wrap

export const ModalSingleCommentA = styled(SingleComment)`
  /// -----------------------------------
  width: 31%;
  max-width: 230px;

  margin: 0.5em 0.5em 1em 0.5em;
  padding: 0.6em;
`;
export const ModalSingleCommentM1 = styled(SingleComment)`
  /// -----------------------------------
  width: 31%;
  height: 250px;
  max-width: 230px;

  margin: 0.5em 0.5em 1em 0.5em;
  padding: 0.6em;
`;
export const ModalSingleCommentM2 = styled(SingleComment)`
  /// -----------------------------------
  width: 31%;
  height: 200px;
  max-width: 230px;

  margin: 0.5em 0.5em 1em 0.5em;
  padding: 0.6em;
`;
export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CommentTopA = styled.div`
  grid-row: 1 / 2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const CommentTopM1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const CommentTopM2 = styled.div`
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

const ResultEmpty = styled.div`
  display: flex;
  align-items: center;

  height: 150px;
`;

// ============================ Request Beer
const RequestBeerModal = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;
`;

const RadioArea = styled.div`
  display: flex;
`;

const RadioWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin: 0 1em 0 0;
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

const RequestTitleArea = styled.div`
  display: grid;
  grid-template-columns: 5em auto;

  margin: 0.8em 0 0.5em 0;
`;

const Subtitle = styled.div`
  grid-column: 1 / 2;

  display: flex;
  align-self: center;

  margin: 0 0 0.1em 0;
  font-size: 0.95em;
`;
const RequestTitle = styled.input`
  grid-column: 2 / 3;

  display: flex;
  width: 60%;
  height: auto;
  border: 2px solid ${mainYellow};
  border-radius: 8px;
  padding: 0.5em 0.4em 0.4em 0.4em;

  font-size: 0.95em;
  &:focus {
    outline: none;
  }
`;

const RequestBodyArea = styled.div`
  display: grid;
  grid-template-columns: 5em auto;
`;
const RequestBody = styled.textarea`
  grid-column: 2 / 3;
  resize: none;

  width: 95%;
  border: 2px solid ${mainYellow};
  border-radius: 8px;

  padding: 0.5em 0.4em 0.5em 0.4em;
  line-height: 1.5;
  font-size: 0.95em;

  &:focus {
    outline: none;
  }
`;

const RequestSubmitBtn = styled.button`
  cursor: pointer;

  display: flex;
  align-self: flex-end;

  border: 0px;
  border-radius: 8px;

  margin: 0.5em 1.2em 0 0;
  padding: 0.4em 0.6em 0.35em 0.6em;

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
