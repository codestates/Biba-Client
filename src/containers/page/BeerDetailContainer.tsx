import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import { Tag, StarWrap, FStar, EStar } from '../../components/page/BeerDetail';
import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
} from '../../components/nav/color';

import {
  SingleComment,
  MainWrap,
  UserWrap,
  Profile,
  PIcon,
  Nickname,
  RateWrap,
  URStar,
  UserRate,
  Comment,
} from './../../containers/nav/ModalContainer';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { starStatusInit } from '../../modules/beerdetail';
import { BeerDetail } from '../../components/page/BeerDetail';
import { Bookmark, IBeerDetail, aReview } from '../../modules/beerdetail';
import {
  DefaultProps,
  IBeerDetailWithAll,
} from '../../containers/page/HomeContainer';
import { checkStarScore } from './pageUtils';

export interface BeerDetailProps extends DefaultProps {
  beerDetail: IBeerDetail;
  bookmark: boolean;
  handleBookmark(): void;
  handleTag(): JSX.Element[];
  disBasic: boolean;
  disStory: boolean;
  disMore: boolean;
  tabBasic: boolean;
  tabStory: boolean;
  tabMore: boolean;
  handleInfoTab(e: React.MouseEvent<HTMLElement>): void;
  handleStar(): JSX.Element[];
  user_review: boolean;
  user_input: string;
  user_star: boolean;
  mainReviewList(): JSX.Element[] | JSX.Element;
  handleClickUsersReview(): void;
  handleClickAllReviews(): void;
}

const BeerDetailContainer = ({
  match,
  history,
  location,
}: DefaultProps): JSX.Element => {
  const { isLogin, token } = useSelector((state: RootState) => state.login);
  const { beerDetail } = useSelector((state: RootState) => state.beerDetail);
  const { bookmark } = useSelector((state: RootState) => state.bookmark);
  const { user_review, user_star, user_input, user_rate } = useSelector(
    (state: RootState) => state.userReview,
  );

  const { allReviews } = useSelector((state: RootState) => state.allReviews);
  const { disBasic, disStory, disMore } = useSelector(
    (state: RootState) => state.infoDisplay,
  );
  const { tabBasic, tabStory, tabMore } = useSelector(
    (state: RootState) => state.infoStatus,
  );

  const { a, b, c, d, e } = useSelector((state: RootState) => state.starStatus);
  const currentStatus = [a, b, c, d, e];

  // 이하 함수는 리스트 페이지에 작성 -> 특정 맥주 클릭 시 get 요청 -> 스토어에 정보 들어감
  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };

  const handleBookmark = (): void => {
    if (!isLogin) {
      return alert(`로그인 후 이용해주세요.`);
    }
    axios
      .post<Bookmark>(`https://beer4.xyz/bookmark`, {
        token: token,
        beer_id: beerDetail.id,
      })
      .then((res) => {
        const { bookmark } = res.data; // 추가되었을 경우 true 돌아옴
        if (res.status === 201 && (bookmark === true || bookmark === false)) {
          dispatch({ type: 'SET_BOOKMARK', bookmark }); // store에 저장된 bookmark 상태 업데이트
          bookmark
            ? alert(`즐겨찾기에 추가되었습니다.`)
            : alert(`즐겨찾기에서 삭제되었습니다.`);
        } else {
          alert(`즐겨찾기 추가에 실패하였습니다.`);
        }
      })
      .catch(() => {
        alert(`즐겨찾기 추가에 실패하였습니다.`);
      });
  };
  const setInfoTabBasic = (): void => {
    dispatch({
      type: 'SET_INFOSTATUS',
      tabBasic: true,
      tabStory: false,
      tabMore: false,
    });
  };
  const setInfoTabStory = (): void => {
    dispatch({
      type: 'SET_INFOSTATUS',
      tabBasic: false,
      tabStory: true,
      tabMore: false,
    });
  };
  const setInfoTabMore = (): void => {
    dispatch({
      type: 'SET_INFOSTATUS',
      tabBasic: false,
      tabStory: false,
      tabMore: true,
    });
  };
  const handleInfoTab = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.currentTarget.id === 'basic') setInfoTabBasic();
    if (e.currentTarget.id === 'story') setInfoTabStory();
    if (e.currentTarget.id === 'more') setInfoTabMore();
  };
  const handleClickStar = (star: React.MouseEvent<HTMLElement>): void => {
    if (!isLogin) {
      return alert(`로그인 후 이용해주세요.`);
    }
    if (currentStatus.indexOf(true) !== -1) {
      if (user_input === '') {
        axios
          .post(`https://beer4.xyz/comment/update`, {
            token: token,
            beer_id: beerDetail.id,
            comment: '',
            rate: 0,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              dispatch({ type: 'SET_STARSTATUS', starStatusInit });
              dispatch({
                type: 'SET_USERREVIEW',
                user_review,
                user_star: false,
                user_input: '',
                user_rate: -1,
              });
            }
            return alert(`별점이 수정되었습니다.`);
          })
          .catch(() => {
            alert(`별점 수정에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
          });
        return undefined;
      } else {
        alert(`작성된 리뷰 내용이 있습니다. 리뷰를 삭제해주세요.`);
        handleModal(ContentType.UsersReview, true);
        return undefined;
      }
    }
    const { a, b, c, d, e } = checkStarScore(Number(star.currentTarget.id)); // 별점 dispatch 준비 함수, boolean 객체 돌려줌
    console.log(Number(star.currentTarget.id));
    const rate = Number(star.currentTarget.id);
    if (!user_star) {
      axios
        .post(`https://beer4.xyz/comment/create`, {
          token: token,
          beer_id: beerDetail.id,
          comment: user_input,
          rate: rate,
        })
        .then((res) => {
          console.log(res);
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
          return alert(`별점이 등록되었습니다.`);
        })
        .catch(() => {
          alert(`별점 등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
        });
    } else {
      axios
        .post(`https://beer4.xyz/comment/update`, {
          token: token,
          beer_id: beerDetail.id,
          comment: user_input,
          rate: rate,
        })
        .then((res) => {
          console.log(res);
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
          return alert(`별점이 등록되었습니다.`);
        })
        .catch(() => {
          alert(`별점 등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.`);
        });
    }
  };

  const mainReviewList = (): JSX.Element[] | JSX.Element => {
    if (allReviews.length !== 0) {
      const mainReviews = allReviews.slice(0, 4);
      return mainReviews.map((ele) => {
        return (
          <DetailSingleComment
            key={`review${mainReviews.indexOf(ele)}`}
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
          </DetailSingleComment>
        );
      });
    } else {
      return (
        <DetailNoComment>
          <div>아직 등록된 리뷰가 없습니다.</div>
        </DetailNoComment>
      );
    }
  };

  const handleClickUsersReview = (): void => {
    if (!isLogin) {
      return alert(`로그인 후 이용해주세요.`);
    }
    if (!user_star) {
      return alert(`별점을 먼저 등록해주세요.`);
    }
    handleModal(ContentType.UsersReview, true);
  };

  const handleClickAllReviews = (): void => {
    handleModal(ContentType.AllReviews, true);
  };

  const handleTag = (): JSX.Element[] => {
    const { tags } = beerDetail;
    return tags.map((ele) => {
      return (
        <Tag
          key={`tag${tags.indexOf(ele)}`}
          className='beerTag'
          id={`tag${tags.indexOf(ele)}`}
        >
          {ele}
        </Tag>
      );
    });
  };

  const handleStar = (): JSX.Element[] => {
    const stars = [
      [a, 1],
      [b, 2],
      [c, 3],
      [d, 4],
      [e, 5],
    ];
    // onclick시 ele 값 넘기는 함수
    return stars.map((ele) => {
      return (
        <StarWrap
          key={`star${ele[1]}`}
          className='star'
          id={`${ele[1]}`}
          onClick={handleClickStar}
        >
          <FStar style={!ele[0] ? { display: 'block' } : { display: 'none' }} />
          <EStar style={ele[0] ? { display: 'block' } : { display: 'none' }} />
        </StarWrap>
      );
    });
  };

  return (
    <BeerDetail
      match={match}
      history={history}
      location={location}
      beerDetail={beerDetail}
      bookmark={bookmark}
      handleBookmark={handleBookmark}
      handleTag={handleTag}
      disBasic={disBasic}
      disStory={disStory}
      disMore={disMore}
      tabBasic={tabBasic}
      tabStory={tabStory}
      tabMore={tabMore}
      handleInfoTab={handleInfoTab}
      handleStar={handleStar}
      user_review={user_review}
      user_input={user_input}
      user_star={user_star}
      mainReviewList={mainReviewList}
      handleClickUsersReview={handleClickUsersReview}
      handleClickAllReviews={handleClickAllReviews}
    />
  );
};

export const BeerDetailWithRouter = withRouter(BeerDetailContainer);

const DetailSingleComment = styled(SingleComment)`
  width: 23%;

  margin: 0 0.4em 0 0.4em;
`;

const DetailNoComment = styled(SingleComment)`
  justify-content: center;
  align-items: center;
  width: 100%;

  border: 2px solid ${mainYellowOpac};

  margin: 0 0.2em 0 0.2em;
`;
