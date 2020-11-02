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
import {
  aReview,
  compareBeerInit,
  starStatusInit,
} from '../../modules/beerdetail';
import { Modal } from '../../components/nav/Modal';

import { nicknameCheck } from '../user/userUtils';
import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  accent,
  lightGrey3,
} from '../../components/nav/color';
import { InputWithCheck, Input, CheckBtn } from '../../components/user/Signup';
import { Content } from '../../components/user/Mypage';
import {
  Tag,
  Stars,
  StarWrap,
  FStar,
  EStar,
} from '../../components/page/BeerDetail';

import { IBeerDetail } from '../../modules/beerdetail';
import { IBeerDetailWithAll } from '../page/HomeContainer';
import { checkStarScore } from '../page/pageUtils';
import { IProfile } from '../user/MypageContainer';
import { MyReview } from '../../modules/user';

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

const confirmBtnColor = '#989898';
const confirmTextColor = 'lightGrey';

export const ModalContainer = (props: RouterProps): JSX.Element => {
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
  const { profile } = useSelector((state: RootState) => state.profile);
  const nicknameConfirm = useSelector(
    (state: RootState) => state.confirmNickname.value,
  );
  const { myReviews } = useSelector((state: RootState) => state.myReviews);
  // === detail
  const { beerDetail } = useSelector((state: RootState) => state.beerDetail);
  const { option1, option2 } = useSelector(
    (state: RootState) => state.myBeerListType,
  );
  const rawFavoriteBeers = useSelector(
    (state: RootState) => state.favoriteBeer.abcBeers,
  );
  const rawReviewedBeers = useSelector(
    (state: RootState) => state.reviewBeer.beers,
  );
  const selectedBeerId = useSelector(
    (state: RootState) => state.selectedBeer.id,
  );
  const { user_review, user_star, user_input, user_rate } = useSelector(
    (state: RootState) => state.userReview,
  );
  const { a, b, c, d, e } = useSelector((state: RootState) => state.starStatus);
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
    nickname: '',
    review: '',
    beerName: '',
    beerRequest: '',
  });

  // ================================================================ Change Nickname 함수
  const handleConfirmNickname = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_NICKNAME', value });
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
            // alert(`닉네임이 정상적으로 변경되었습니다.`);
            setInputValues({ ...inputValues, nickname: '' });
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

  // ================================================================ MyBeerList 함수
  const handleMyListType = (option1: boolean, option2: boolean): void => {
    dispatch({ type: 'SET_MYBEERTYPE', option1, option2 });
  };
  const handleRadioOption1 = (): void => {
    handleMyListType(true, false);
  };
  const handleRadioOption2 = (): void => {
    handleMyListType(false, true);
  };
  const myBeerListImg = React.useRef(null);

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
    <BeerOptions
      id={ele.id}
      key={`favBeerIndex${favoriteBeerIndex.indexOf(ele)}`}
      value={ele.beerName}
    >
      {ele.beerName}
    </BeerOptions>
  ));
  const mapOption2 = reviewedBeerIndex.map((ele) => (
    <BeerOptions
      id={ele.id}
      key={`reviewedBeerIndex${reviewedBeerIndex.indexOf(ele)}`}
      value={ele.beerName}
    >
      {ele.beerName}
    </BeerOptions>
  ));
  const setSelectedBeerId = (id: number): void => {
    dispatch({ type: 'SET_SELECTEDBEER', id });
  };

  const handleSelectBeer = (
    // 사진 ref에 업로드만, 전송 x
    e: React.ChangeEvent<HTMLSelectElement>,
    option: boolean,
  ): void => {
    const { current } = myBeerListImg as React.RefObject<IProfile>;
    let imgTarget: {
      id: string;
      beerName: string;
      image: string;
    }[];
    if (option) {
      imgTarget = favoriteBeerIndex.filter(
        (ele) =>
          favoriteBeerIndex.indexOf(ele) === e.target.options.selectedIndex - 1,
      );
    } else {
      imgTarget = reviewedBeerIndex.filter(
        (ele) =>
          reviewedBeerIndex.indexOf(ele) === e.target.options.selectedIndex - 1,
      );
    }
    if (current) {
      current.src = imgTarget[0].image;
    }
  };

  const handleClickBeerSelect = (): void => {
    if (selectedBeerId !== -1) {
      axios
        .post<IBeerDetailWithAll>(`https://beer4.xyz/beer/${selectedBeerId}`, {
          user_id: userData.id,
          beer_id: selectedBeerId,
        })
        .then((res) => {
          // console.log(res.data);
          const compareBeer: IBeerDetail = res.data;
          dispatch({
            type: 'SET_COMPAREBEER',
            compareBeer: compareBeer,
          });

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
      setSelectedBeerId(-1);
      return closeModal();
    } else {
      return alert(`비교할 맥주를 선택해주세요.`);
    }
  };

  // ================================================================ User Review 함수
  const handleClickStar = (star: React.MouseEvent<HTMLElement>): void => {
    if (!isLogin) {
      // alert(`로그인 후 이용해주세요.`);
      handleModal(ContentType.Login, true);
      return;
    }
    const { a, b, c, d, e } = checkStarScore(Number(star.currentTarget.id)); // 별점 dispatch 준비 함수, boolean 객체 돌려줌
    // console.log(Number(star.currentTarget.id));
    const rate = Number(star.currentTarget.id);
    axios
      .post(`https://beer4.xyz/comment/update`, {
        token: token,
        beer_id: beerDetail.id,
        comment: user_input,
        rate: rate,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          dispatch({ type: 'SET_STARSTATUS', a, b, c, d, e }); // 최초 진입 시 내가 준 별점 store에 저장
          dispatch({
            type: 'SET_USERREVIEW',
            user_review,
            user_star: true,
            user_input,
            user_rate: rate,
          });
        }
        return alert(`${beerDetail.beer_name}에 ${rate}점을 주셨습니다. Biba!`);
        // return closeModal();
      })
      .catch(() => {
        alert(`별점 등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
        return closeModal();
      });
  };

  const handleResetStar = (star: React.MouseEvent<HTMLElement>): void => {
    if (user_input !== '') {
      return alert(
        `작성된 리뷰 내용이 있습니다.\n리뷰 삭제 기능을 이용해주세요.`,
      );
    }
    axios
      .post(`https://beer4.xyz/comment/delete`, {
        token: token,
        beer_id: beerDetail.id,
        comment: '',
        rate: 0,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          dispatch({
            type: 'SET_STARSTATUS',
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
          });
          dispatch({
            type: 'SET_USERREVIEW',
            user_review,
            user_star: false,
            user_input,
            user_rate: -1,
          });
        }
        alert(`별점 등록이 취소되었습니다.`);
        return closeModal();
      })
      .catch(() => {
        alert(`별점 삭제에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
        return closeModal();
      });
  };

  const handleClickSubmitReview = (): void => {
    // review 작성 모달 창 내에서 작동
    if (!isLogin) {
      // alert(`로그인 후 이용해주세요.`);
      closeModal();
      handleModal(ContentType.Login, true);
      return;
    } else if (inputValues.review === '') {
      // alert(`리뷰 내용을 작성해주세요.`);
      closeModal();
    } else if (!user_star) {
      alert(`별점을 먼저 등록해주세요.`);
    } else {
      axios
        .post(`https://beer4.xyz/comment/update`, {
          token: token,
          beer_id: beerDetail.id,
          comment: inputValues.review,
          rate: user_rate,
        })
        .then((res) => {
          if (res.status === 201) {
            dispatch({
              type: 'SET_USERREVIEW',
              user_review: true,
              user_star,
              user_input: inputValues.review,
              user_rate,
            });
            setInputValues({ ...inputValues, review: '' });
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
  };

  const handleClickDeleteReview = (): void => {
    const result = global.confirm(
      `리뷰를 삭제하시겠어요?\n별점도 함께 삭제됩니다.`,
    );
    if (result) {
      axios
        .post(`https://beer4.xyz/comment/delete`, {
          beer_id: beerDetail.id,
          token: token,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 201) {
            dispatch({
              type: 'DELETE_USERREVIEW',
            });
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

  const handleStar = (): JSX.Element[] => {
    const stars = [
      [a, 1],
      [b, 2],
      [c, 3],
      [d, 4],
      [e, 5],
    ];
    return stars.map((ele) => {
      return (
        <StarWrap
          key={`star${ele[1]}`}
          className='star'
          id={`${ele[1]}`}
          onClick={handleClickStar}
        >
          <FStar style={ele[0] ? { display: 'block' } : { display: 'none' }} />
          <EStar style={!ele[0] ? { display: 'block' } : { display: 'none' }} />
        </StarWrap>
      );
    });
  };
  // ================================================================ Comment 함수
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
        <ChangeNicknameWrap>
          <NicknameGuide>새로운 닉네임을 입력해주세요.</NicknameGuide>
          <InputWithCheck>
            <Input
              type='text'
              name='nickname'
              defaultValue={inputValues.nickname}
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
    // ==================================================== my beer list
    if (contentType === ContentType.MyBeerList) {
      return (
        <MyBeerListModal>
          <MyBeerListImgDiv>
            <MyBeerListImg ref={myBeerListImg} />
          </MyBeerListImgDiv>
          <MyBeerListSelect>
            <BLRadioWrap>
              <BLRadio>
                <Radio
                  id='option1'
                  type='radio'
                  name='myBeerType'
                  value='즐겨찾기에 추가한 맥주'
                  checked={option1}
                  onChange={() => handleRadioOption1()}
                />
                <RadioOption onClick={handleRadioOption1}>
                  즐겨찾는 맥주
                </RadioOption>
              </BLRadio>
              <BLRadio>
                <Radio
                  id='option2'
                  type='radio'
                  name='myBeerType'
                  value='리뷰를 남긴 맥주'
                  checked={option2}
                  onChange={() => handleRadioOption2()}
                />
                <RadioOption onClick={handleRadioOption2}>
                  리뷰한 맥주
                </RadioOption>
              </BLRadio>
            </BLRadioWrap>
            <SelectWrap>
              <SelectBeer
                name='selectBeerName'
                onChange={(e) => {
                  const targetId =
                    e.target.options[e.target.options.selectedIndex].id;
                  setSelectedBeerId(Number(targetId));
                  handleSelectBeer(e, option1);
                }}
              >
                <DefaultOption key='optionDefault' className='default'>
                  맥주 이름 선택
                </DefaultOption>
                {option1 ? mapOption1 : mapOption2}
              </SelectBeer>
              <CompareBtn onClick={handleClickBeerSelect}>Biba!</CompareBtn>
            </SelectWrap>
          </MyBeerListSelect>
        </MyBeerListModal>
      );
    }
    // ==================================================== add review
    if (contentType === ContentType.UsersReview) {
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
          </ReviewTextAreaWrap>
        </ReviewWrap>
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
              onChange={handleInputOnChange}
              placeholder='맥주 이름을 작성해주세요.'
            />
          </RequestTitleArea>
          <RequestBodyArea className='requestBodyArea'>
            <Subtitle className='subtitle'>내용</Subtitle>
            <RequestBody
              name='beerRequest'
              defaultValue={inputValues.beerRequest}
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

export const MyBeerListModal = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 95%;
`;
const MyBeerListImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;

  border: 2px solid ${mainYellowOpac};
  border-radius: 16px;
  overflow: hidden;

  margin: 0 1em 0 0;
`;
const MyBeerListImg = styled.img`
  display: flex;

  height: 150px;
`;

const MyBeerListSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const BLRadioWrap = styled.div`
  display: flex;
  align-items: center;

  margin: 0.7em 0 0 0;
`;
const BLRadio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 0.3em 0.2em 0;
`;

const SelectWrap = styled.div`
  display: flex;
  align-items: center;

  margin: 0.5em 0 0 0;
`;
const SelectBeer = styled.select`
  display: flex;

  width: 12em;
  max-width: 12em;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border: 0;
  border-bottom: 2px solid ${mainYellowOpac};
  border-radius: 0;

  margin: 0.5em 0 0 0;
  padding: 0 0 0.2em 0;

  color: ${mainGrey};
  &:focus,
  &:active {
    outline: none;
    border-bottom-color: ${mainYellow};
  }
`;

const DefaultOption = styled.option``;
const BeerOptions = styled.option``;
const CompareBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-self: center;

  border: 0px;
  border-radius: 8px;

  margin: 0.15em 0 0 0.6em;
  padding: 0.4em 0.8em 0.35em 0.8em;

  font-size: 1.1em;
  letter-spacing: 0.1em;

  background-color: ${mainYellow};
  color: #fff;

  &: hover {
    background-color: ${accent};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

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

// ============================ Add Review
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
`;
const ReviewTextAreaWrap = styled.div`
  display: flex;
  width: 100%;
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
