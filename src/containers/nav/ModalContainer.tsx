import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';

import { LoginContainerWithRouter } from '../user/LoginContainer';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';
import { aReview } from '../../modules/beerdetail';
import { Modal } from '../../components/nav/Modal';
import { nicknameCheck } from '../user/userUtils';
import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
} from '../../components/nav/color';

export interface ModalProps {
  display: boolean;
  contentType: ContentType;
  content: JSX.Element | JSX.Element[];
  user_review: boolean;
  closeModal(): void;
  btnColor: string;
  textColor: string;
  pressEsc(e: React.KeyboardEvent<HTMLInputElement>): void;
}

export const ModalContainer = (props: RouterProps): JSX.Element => {
  // modal이 필요한 각 페이지에서 상황에 맞게 dispatch
  // 1. modal display -> true, false 지정
  // 2. 어떤 콘텐츠가 나와야하는지에 따라 ContentType 지정
  const { contentType, display } = useSelector(
    (state: RootState) => state.modal,
  );
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const nicknameConfirm = useSelector(
    (state: RootState) => state.confirmNickname.value,
  );
  const btnColor = useSelector((state: RootState) => state.btnColor.btn);
  const textColor = useSelector((state: RootState) => state.btnColor.text);

  const { myReviews } = useSelector((state: RootState) => state.myReviews);
  const { allReviews } = useSelector((state: RootState) => state.allReviews);
  const { user_review, user_input } = useSelector(
    (state: RootState) => state.userReview,
  );

  const { request1, request2 } = useSelector(
    (state: RootState) => state.beerRequest,
  );

  const dispatch = useDispatch();
  const handleConfirmNickname = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_NICKNAME', value });
  };
  const handleBtnColor = (btn: string, text: string): void => {
    dispatch({ type: 'SET_BTNCOLOR', btn, text });
  };

  const [inputValues, setInputValues] = useState({
    nickname: '',
    review: '',
    beerName: '',
    beerRequest: '',
  });
  const handleNicknameOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();
    if (nicknameConfirm && e.currentTarget.name === 'nickname') {
      handleConfirmNickname(false);
    }
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleInputOnChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleRequestType = (request1: boolean, request2: boolean): void => {
    dispatch({ type: 'SET_REQUESTTYPE', request1, request2 });
  };

  const handleRadioSelect1 = (): void => {
    handleRequestType(true, false);
  };

  const handleRadioSelect2 = (): void => {
    handleRequestType(false, true);
  };

  const handleClickSubmitRequest = () => {
    // axios
    //   .post
    console.log(request1, request2);
    console.log(inputValues.beerName, inputValues.beerRequest);
  };

  const handleCheckNickname = (): void => {
    if (inputValues.nickname !== '') {
      if (nicknameCheck(inputValues.nickname)) {
        axios
          .post(`https://beer4.xyz/users/checknickname`, {
            nickname: inputValues.nickname,
          })
          .then((res) => {
            if (res.status === 200) alert(`사용할 수 있는 닉네임입니다.`);
            // 중복 확인 버튼 변화 && confirm dispatch
            handleBtnColor('#989898', 'lightgrey');
            handleConfirmNickname(true);
          })
          .catch(() => {
            handleBtnColor('#989898', 'lightgrey'); // 임시
            handleConfirmNickname(true); // 임시
            alert(`이미 존재하는 닉네임입니다.\n다른 닉네임을 사용해주세요.`);
          });
      } else {
        alert(
          `닉네임을 확인해주세요.\n6~12자리의 영문, 숫자 조합이어야 합니다.`,
        );
      }
    } else {
      alert(`닉네임을 입력해주세요.`);
    }
  };

  const handleClickChangeNickname = (): void => {
    const { nickname } = inputValues;
    nicknameCheck(nickname);
    console.log('nickname change test');
    if (nicknameConfirm) {
      axios
        .post(`https://beer4.xyz/users/changenickname`, {
          token: token,
          nickname: inputValues.nickname,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
          }
        });
    }
  };

  const content = (contentType: ContentType): JSX.Element | JSX.Element[] => {
    // 이 함수의 결과가 component의 Modals로 넘어감
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
              defaultValue=''
              onChange={handleInputOnChange}
              placeholder='맥주 이름을 작성해주세요.'
            />
          </RequestTitleArea>
          <RequestBodyArea className='requestBodyArea'>
            <Subtitle className='subtitle'>내용</Subtitle>
            <RequestBody
              name='beerRequest'
              defaultValue=''
              onChange={handleInputOnChange}
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

    if (contentType === ContentType.Empty) {
      return <></>;
    }
    if (contentType === ContentType.Login) {
      return <LoginContainerWithRouter />;
    }
    if (contentType === ContentType.MypageAllReviews) {
      return myReviews.length !== 0 ? (
        myReviews.map((ele: aReview) => (
          <ModalSingleComment
            key={`myReview${myReviews.indexOf(ele)}`}
            className='singleComment'
          >
            <MainWrap className='commentWrap'>
              <UserWrap className='userWrap'>
                {ele.profile === '' || ele.profile === undefined ? (
                  <PIcon />
                ) : (
                  <Profile className='profile' src='' alt='profile'>
                    {ele.profile}
                  </Profile>
                )}
                <Nickname className='nickname'>{ele.nickname}</Nickname>
              </UserWrap>
              <Comment className='comment'>{ele.comment}</Comment>
            </MainWrap>
            <RateWrap className='rateWrap'>
              <URStar className='userRateStar' />
              <UserRate className='userRate'>{ele.rate}</UserRate>
            </RateWrap>
          </ModalSingleComment>
        ))
      ) : (
        <ResultEmpty>작성한 리뷰가 없습니다.</ResultEmpty>
      );
    }
    if (contentType === ContentType.ChangeNickname) {
      return (
        <>
          <div>사용 중인 닉네임: {userData.nickname}</div>
          <div>새로운 닉네임을 입력해주세요.</div>
          <div>
            <input
              type='text'
              name='nickname'
              onChange={handleNicknameOnChange}
            ></input>
            <button
              onClick={handleCheckNickname}
              style={
                nicknameConfirm
                  ? { background: btnColor, color: textColor }
                  : {}
              }
            >
              중복 확인
            </button>
          </div>
          <button onClick={handleClickChangeNickname}>변경하기</button>
        </>
      );
    }
    if (contentType === ContentType.UsersReview) {
      return (
        <ReviewWrap className='reviewWrap'>
          <ReviewTextArea
            name='review'
            defaultValue={user_review ? user_input : ''}
            onChange={handleInputOnChange}
            maxLength={100}
            rows={4}
            placeholder='리뷰를 작성해주세요.'
            wrap='hard'
          ></ReviewTextArea>
          <ReviewSubmitBtn>
            {user_review ? `수정하기` : `등록하기`}
          </ReviewSubmitBtn>
        </ReviewWrap>
      );
    }
    if (contentType === ContentType.AllReviews) {
      return allReviews.length !== 0 ? (
        allReviews.map((ele: aReview) => (
          <ModalSingleComment
            key={`review${allReviews.indexOf(ele)}`}
            className='singleComment'
          >
            <MainWrap className='commentWrap'>
              <UserWrap className='userWrap'>
                {ele.profile === '' || ele.profile === undefined ? (
                  <PIcon />
                ) : (
                  <Profile className='profile' src='' alt='profile'>
                    {ele.profile}
                  </Profile>
                )}
                <Nickname className='nickname'>{ele.nickname}</Nickname>
              </UserWrap>
              <Comment className='comment'>{ele.comment}</Comment>
            </MainWrap>
            <RateWrap className='rateWrap'>
              <URStar className='userRateStar' />
              <UserRate className='userRate'>{ele.rate}</UserRate>
            </RateWrap>
          </ModalSingleComment>
        ))
      ) : (
        <ResultEmpty>작성된 리뷰가 없습니다.</ResultEmpty>
      );
    }

    return <div></div>;
  };

  const handleModalClose = (
    contentType: ContentType,
    display: boolean,
  ): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const closeModal = (): void => {
    handleModalClose(ContentType.Empty, false);
  };

  const pressEsc = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ESC') closeModal();
  }; // 추후 추가 작업

  return (
    <Modal
      display={display}
      contentType={contentType}
      content={content(contentType)}
      user_review={user_review}
      closeModal={closeModal}
      btnColor={btnColor}
      textColor={textColor}
      pressEsc={pressEsc}
    />
  );
};

export const ModalContainerWithRouter = withRouter(ModalContainer);

export const SingleComment = styled.div`
  // ModalContainer - ModalSingleComment 참고
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // width: 23%;
  height: 180px;
  min-width: 180px;
  min-height: 120px;

  border: 2px solid ${mainYellow};
  border-radius: 8px;

  margin: 0.5em 0.5em 1em 0.5em;
  padding: 0.6em;
`; // 하나의 코멘트 wrap

export const ModalSingleComment = styled(SingleComment)`
  width: 31%;
  min-width: 220px;
  max-width: 250px;
`;

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const UserWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin: 0 0 0.4em 0;
`;
export const Profile = styled.img`
  display: flex;
  width: 1.5em;
  height: 1.5em;

  margin: 0 0.3em 0 0;
`;
export const PIcon = styled(BiUserCircle)`
  display: flex;

  width: 1.5em;
  height: 1.5em;

  margin: 0 0.3em 0 0;
  color: ${mainGrey};
`;
export const Nickname = styled.div`
  display: flex;

  padding: 0.2em 0 0 0;

  font-size: 0.95em;
`;

export const RateWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  align-self: flex-end;
`;
export const URStar = styled(FaStar)`
  display: flex;

  margin: 0 0.25em 0 0;
  color: ${mainYellow};
`;
export const UserRate = styled.div`
  display: flex;

  padding: 0.1em 0.2em 0 0;
`;

export const Comment = styled.div`
  display: flex;

  margin: 0 0 0 0.2em;
  font-size: 0.9em;
`;

const ResultEmpty = styled.div`
  display: flex;
  align-items: center;

  height: 150px;
`;

// ============================ User Review
const ReviewWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 90%;
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
`;

const ReviewSubmitBtn = styled.button`
  cursor: pointer;

  display: flex;
  align-self: flex-end;

  border: 0px;
  border-radius: 8px;

  margin: 0 0 0 0.5em;
  padding: 0.5em 0.6em 0.35em 0.6em;

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
const Radio = styled.input`
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
const RadioOption = styled.div`
  display: flex;
  cursor: pointer;
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
