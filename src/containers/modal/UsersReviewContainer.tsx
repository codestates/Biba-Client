import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import { MDUsersReview } from '../../components/modal/UsersReview';
import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';
import { checkStarScore } from '../page/pageUtils';
import { aReview } from '../../modules/beerdetail';
import { ModalContentProps } from './ModalContainer';

import { StarWrap, FStar, EStar } from '../../components/page/BeerDetail';

export interface MDUsersReviewProps {
  user_review: boolean;
  user_star: boolean;
  user_input: string;
  inputValues: {
    review: string;
  };
  handleReviewOnChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  handleStar(): JSX.Element[];
  handleResetStar(star: React.MouseEvent<HTMLElement>): void;
  handleClickSubmitReview(): void;
  handleClickDeleteReview(): void;
}

export const MDUsersReviewContainer = ({
  userData,
  isLogin,
  token,
  handleModal,
  closeModal,
}: ModalContentProps): JSX.Element => {
  const { beerDetail } = useSelector((state: RootState) => state.beerDetail);
  const { user_review, user_star, user_input, user_rate } = useSelector(
    (state: RootState) => state.userReview,
  );
  const { a, b, c, d, e } = useSelector((state: RootState) => state.starStatus);

  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    review: '',
  });
  const handleReviewOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

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
    console.log(inputValues);
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
  return (
    <MDUsersReview
      user_review={user_review}
      user_star={user_star}
      user_input={user_input}
      inputValues={inputValues}
      handleReviewOnChange={handleReviewOnChange}
      handleStar={handleStar}
      handleResetStar={handleResetStar}
      handleClickSubmitReview={handleClickSubmitReview}
      handleClickDeleteReview={handleClickDeleteReview}
    />
  );
};
