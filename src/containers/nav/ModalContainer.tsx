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
import { InputWithCheck, Input, CheckBtn } from '../../components/user/Signup';
import { Content } from '../../components/user/Mypage';
import { IBeerDetail } from '../../modules/beerdetail';
import { IBeerDetailWithAll } from '../page/HomeContainer';
import { checkStarScore } from '../page/pageUtils';

export interface ModalProps {
  display: boolean;
  closeModal(): void;
  pressEsc(e: React.KeyboardEvent<HTMLInputElement>): void;
  user_review: boolean;
  contentType: ContentType;
  content: JSX.Element | JSX.Element[];
  allReviews: aReview[];
}

const confirmBtnColor = '#989898';
const confirmTextColor = 'lightGrey';

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
  const { beerDetail } = useSelector((state: RootState) => state.beerDetail);
  const rawFavoriteBeers = useSelector(
    (state: RootState) => state.favoriteBeer.beers,
  );
  const rawReviewedBeers = useSelector(
    (state: RootState) => state.reviewBeer.beers,
  );
  const { option1, option2 } = useSelector(
    (state: RootState) => state.myBeerListType,
  );
  const { myReviews } = useSelector((state: RootState) => state.myReviews);
  const { allReviews } = useSelector((state: RootState) => state.allReviews);
  const { user_review, user_star, user_input, user_rate } = useSelector(
    (state: RootState) => state.userReview,
  );
  const { request1, request2 } = useSelector(
    (state: RootState) => state.beerRequest,
  );
  const selectedBeerId = useSelector(
    (state: RootState) => state.selectedBeer.id,
  );
  const { disBasic, disStory, disMore } = useSelector(
    (state: RootState) => state.infoDisplay,
  );
  const dispatch = useDispatch();
  // ================================================================ Modal
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const closeModal = (): void => {
    handleModal(ContentType.Empty, false);
  };
  const pressEsc = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ESC') closeModal();
  }; // 추후 추가 작업

  const handleConfirmNickname = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_NICKNAME', value });
  };

  const [inputValues, setInputValues] = useState({
    nickname: '',
    review: '',
    beerName: '',
    beerRequest: '',
  });

  // ================================================================ Change Nickname
  const handleInputOnChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
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
  const handleCheckNickname = (): void => {
    if (inputValues.nickname !== '') {
      if (nicknameCheck(inputValues.nickname)) {
        axios
          .post(`https://beer4.xyz/users/checknickname`, {
            nickname: inputValues.nickname,
          })
          .then((res) => {
            if (res.status === 200) {
              alert(`사용할 수 있는 닉네임입니다.`);
              handleConfirmNickname(true);
            }
          })
          .catch(() => {
            alert(`이미 존재하는 닉네임입니다.\n다른 닉네임을 사용해주세요.`);
          });
      } else {
        alert(
          `닉네임을 확인해주세요.\n4~12자리의 한글, 영어 또는 숫자 조합이어야 합니다.`,
        );
      }
    } else {
      alert(`닉네임을 입력해주세요.`);
    }
  };
  const handleClickChangeNickname = (): void => {
    const { nickname } = inputValues;
    if (nicknameCheck(nickname) && nicknameConfirm) {
      axios
        .post(`https://beer4.xyz/users/changenickname`, {
          token: token,
          nickname: inputValues.nickname,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: 'CHANGE_NICKNAME',
              userData: { ...userData, nickname: nickname },
            });
            alert(`닉네임이 정상적으로 변경되었습니다.`);
            handleConfirmNickname(false);
            return closeModal();
          }
        })
        .catch(() => {
          alert(`닉네임 변경에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
          handleConfirmNickname(false);
          return closeModal();
        });
    }
  };
  // ================================================================ User Review
  const handleClickSubmitReview = (): void => {
    // review 작성 모달 창 내에서 작동
    if (!isLogin) {
      alert(`로그인 후 이용해주세요.`);
      closeModal();
      handleModal(ContentType.Login, true);
    } else if (inputValues.review === '') {
      alert(`리뷰 내용을 작성해주세요.`);
    } else if (!user_star) {
      alert(`별점을 먼저 등록해주세요.`);
      closeModal();
    } else {
      if (!user_review) {
        // 새로 생성
        console.log('review 작성 테스트');
        console.log({
          token: token,
          beer_id: beerDetail.id,
          comment: inputValues.review,
          rate: user_rate,
        });
        axios
          .post(`https://beer4.xyz/comment/update`, {
            token: token,
            beer_id: beerDetail.id,
            comment: inputValues.review,
            rate: user_rate,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              dispatch({
                type: 'SET_USERREVIEW',
                user_review: true,
                user_star,
                user_input: inputValues.review,
                user_rate,
              });
              alert(`리뷰가 등록되었습니다.`);
              axios
                .get<aReview[]>(`https://beer4.xyz/comment/${beerDetail.id}`)
                .then((res) => {
                  const rawReviews = res.data;
                  const allReviews = rawReviews.filter((ele) => {
                    if (ele.comment !== '') return ele;
                  });
                  dispatch({ type: 'SET_ALLREVIEWS', allReviews });
                }); // [{}, {}]
              return closeModal();
            }
          })
          .catch(() => {
            alert(`리뷰 등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
          });
      } else {
        console.log('review 수정 테스트');
        axios
          .post(`https://beer4.xyz/comment/update`, {
            token: token,
            beer_id: beerDetail.id,
            comment: inputValues.review,
            rate: user_rate,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              dispatch({
                type: 'SET_USERREVIEW',
                user_review: true,
                user_star,
                user_input: inputValues.review,
                user_rate,
              });
              alert(`리뷰가 수정되었습니다.`);
              axios
                .get<aReview[]>(`https://beer4.xyz/comment/${beerDetail.id}`)
                .then((res) => {
                  const rawReviews = res.data;
                  const allReviews = rawReviews.filter((ele) => {
                    if (ele.comment !== '') return ele;
                  });
                  dispatch({ type: 'SET_ALLREVIEWS', allReviews });
                }); // [{}, {}]
              return closeModal();
            }
          })
          .catch(() => {
            alert(`리뷰 등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
          });
      }
    }
  };

  const handleClickDeleteReview = (): void => {
    const result = global.confirm(`리뷰를 삭제하시겠어요?`);
    if (result) {
      axios
        .post(`https://beer4.xyz/comment/delete`, {
          beer_id: beerDetail.id,
          token: token,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            dispatch({
              type: 'DELETE_USERREVIEW',
            });
            alert(`리뷰가 삭제되었습니다.`);
            axios
              .get<aReview[]>(`https://beer4.xyz/comment/${beerDetail.id}`)
              .then((res) => {
                const rawReviews = res.data;
                const allReviews = rawReviews.filter((ele) => {
                  if (ele.comment !== '') return ele;
                });
                dispatch({ type: 'SET_ALLREVIEWS', allReviews });
                dispatch({
                  type: 'SET_STARSTATUS',
                  a: false,
                  b: false,
                  c: false,
                  d: false,
                  e: false,
                });
              }); // [{}, {}]
            return closeModal();
          }
        });
    }
  };
  // ================================================================ Beer Request
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
    console.log(inputValues, request1, request2);
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
              return alert(`맥주 요청이 완료되었습니다. Biba!`);
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
  // ================================================================ MyBeerList
  const handleMyListType = (option1: boolean, option2: boolean): void => {
    dispatch({ type: 'SET_MYBEERTYPE', option1, option2 });
  };
  const handleRadioOption1 = (): void => {
    handleMyListType(true, false);
  };
  const handleRadioOption2 = (): void => {
    handleMyListType(false, true);
  };

  const favoriteBeerIndex = rawFavoriteBeers.map((beer) => {
    return {
      id: beer.id,
      beerName: beer.beer_name,
      image: beer.beer_img,
    };
  });
  const reviewedBeerIndex = rawReviewedBeers.map((beer) => {
    return { id: beer.id, beerName: beer.beer_name, image: beer.beer_img };
  });

  const mapOption1 = favoriteBeerIndex.map((ele) => (
    <option
      id={ele.id}
      key={`favBeerIndex${favoriteBeerIndex.indexOf(ele)}`}
      value={ele.beerName}
    >
      {ele.beerName}
    </option>
  ));

  const mapOption2 = reviewedBeerIndex.map((ele) => (
    <option
      id={ele.id}
      key={`reviewedBeerIndex${reviewedBeerIndex.indexOf(ele)}`}
      value={ele.beerName}
    >
      {ele.beerName}
    </option>
  ));

  const setSelectedBeerId = (id: number): void => {
    dispatch({ type: 'SET_SELECTEDBEER', id });
  };

  const handleClickBeerSelect = (): void => {
    axios
      .post<IBeerDetailWithAll>(`https://beer4.xyz/beer/${selectedBeerId}`, {
        user_id: userData.id,
        beer_id: selectedBeerId,
      })
      .then((res) => {
        console.log(res.data);
        const compareBeer: IBeerDetail = res.data;
        dispatch({ type: 'SET_COMPAREBEER', compareBeer });

        const { sparkling, sweet, bitter, accessibility, body } = res.data;
        dispatch({
          type: 'SET_COMPAREDATA',
          sparkling,
          sweet,
          bitter,
          accessibility,
          body,
        });
      });
  };
  // ================================================================ Content
  const content = (contentType: ContentType): JSX.Element | JSX.Element[] => {
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
    // ==================================================== empty
    if (contentType === ContentType.Empty) {
      return <></>;
    }
    // ==================================================== login

    if (contentType === ContentType.Login) {
      return <LoginContainerWithRouter />;
    }
    // ==================================================== mypage reviews
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
                  <Profile
                    className='profile'
                    src={ele.profile}
                    alt='profile'
                  />
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
    // ==================================================== change nickname

    if (contentType === ContentType.ChangeNickname) {
      return (
        <ChangeNicknameWrap>
          <NicknameGuide>새로운 닉네임을 입력해주세요.</NicknameGuide>
          <InputWithCheck>
            <Input
              type='text'
              name='nickname'
              onChange={handleNicknameOnChange}
            ></Input>
            <NNCheckBtn
              onClick={handleCheckNickname}
              style={
                nicknameConfirm
                  ? { background: confirmBtnColor, color: confirmTextColor }
                  : {}
              }
            >
              중복 확인
            </NNCheckBtn>
          </InputWithCheck>
          <NicknameSubmitBtn onClick={handleClickChangeNickname}>
            변경하기
          </NicknameSubmitBtn>
        </ChangeNicknameWrap>
      );
    }
    // ==================================================== my beer list

    if (contentType === ContentType.MyBeerList) {
      return (
        <MyBeerListModal>
          {console.log(option1, mapOption1)}
          <RadioWrap>
            <Radio
              id='option1'
              type='radio'
              name='myBeerType'
              value='즐겨찾기에 추가한 맥주'
              checked={option1}
              onChange={() => handleRadioOption1()}
            />
            <RadioOption onClick={handleRadioOption1}>
              즐겨찾기에 추가한 맥주
            </RadioOption>
            <Radio
              id='option2'
              type='radio'
              name='myBeerType'
              value='리뷰를 남긴 맥주'
              checked={option2}
              onChange={() => handleRadioOption2()}
            />
            <RadioOption onClick={handleRadioOption2}>
              리뷰를 남긴 맥주
            </RadioOption>
          </RadioWrap>
          <select
            name='selectBeerName'
            onChange={(e) => {
              const targetId =
                e.target.options[e.target.options.selectedIndex].id;
              setSelectedBeerId(Number(targetId));
              console.log(e.target.options[e.target.options.selectedIndex].id);
            }}
          >
            <option key='optionDefault' className='default'>
              맥주 이름 선택
            </option>
            {option1 ? mapOption1 : mapOption2}
          </select>
          <button onClick={handleClickBeerSelect}>비교하기</button>
        </MyBeerListModal>
      );
    }
    // ==================================================== add review
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
        </ReviewWrap>
      );
    }
    // ==================================================== all reviews
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
                  <Profile
                    className='profile'
                    src={ele.profile}
                    alt='profile'
                  />
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

  return (
    <Modal
      display={display}
      closeModal={closeModal}
      pressEsc={pressEsc}
      user_review={user_review}
      contentType={contentType}
      content={content(contentType)}
      allReviews={allReviews}
    />
  );
};

export const ModalContainerWithRouter = withRouter(ModalContainer);

export const MyBeerListModal = styled.div`
  display: flex;
  flex-direction: column;
`;

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
const UserReviewBtnArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const UserReviewBtn = styled.button`
  cursor: pointer;

  display: flex;
  align-self: flex-end;

  border: 0px;
  border-radius: 8px;

  margin: 0.3em 0 0 0.5em;
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

// ============================ Change Nickname
const ChangeNicknameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  height: 9em;
`;

const NicknameGuide = styled.div`
  margin: 0 0 0.6em 0;
  padding: 0 0 0 0.8em;
`;
const NNCheckBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;

  margin: 0 0 0.6em 0;
  padding: 0.55em 0.6em 0.45em 0.6em;

  font-size: 0.85em;
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

const NicknameSubmitBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
  width: 8em;

  border: 2px solid ${mainYellowOpac};
  border-radius: 8px;

  margin: 0.7em 0 0.3em 0;
  padding: 0.5em 0.6em 0.4em 0.6em;

  font-size: 1em;
  font-weight: 500;
  // background-color: ${mainYellow};
  // color: #fff;
  background-color: #fff;
  color: ${mainGrey};

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0);
    font-weight: 400;
    background-color: ${mainGrey};
    color: #fff;
  }
  &:focus {
    outline: none;
  }
`;
