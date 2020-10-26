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
  story: boolean;
  more: boolean;
  handleInfoTab(e: React.MouseEvent<HTMLElement>): void;
  handleTag(): JSX.Element[];
  handleStar(): JSX.Element[];
  user_review: boolean;
  mainReviewList(): JSX.Element[] | JSX.Element;
  handleClickUsersReview(): void;
  handleClickAllReviews(): void;
  setBeerDetail(e: React.MouseEvent<HTMLElement>): void;
  setAllReviews(e: React.MouseEvent<HTMLElement>): void;
}

const BeerDetailContainer = ({
  match,
  history,
  location,
}: DefaultProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { beerDetail } = useSelector((state: RootState) => state.beerDetail);
  const { bookmark } = useSelector((state: RootState) => state.bookmark);
  const { user_review, user_star, user_input, user_rate } = useSelector(
    (state: RootState) => state.userReview,
  );

  const { allReviews } = useSelector((state: RootState) => state.allReviews);
  const { story, more } = useSelector((state: RootState) => state.infoStatus);
  const { a, b, c, d, e } = useSelector((state: RootState) => state.starStatus);
  const currentStatus = [a, b, c, d, e];

  // 이하 함수는 리스트 페이지에 작성 -> 특정 맥주 클릭 시 get 요청 -> 스토어에 정보 들어감
  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };

  const handleBookmark = (): void => {
    axios
      .get<Bookmark>(`http://localhost:4000/posts/info/4`)
      // .post<Bookmark>(`https://beer4.xyz/bookmark/add`, {
      // token: token,
      // beer_id: beerDetail.id,
      // })
      .then((res) => {
        const { bookmark } = res.data; // 추가되었을 경우 true 돌아옴
        if (res.status === 200) {
          dispatch({ type: 'SET_BOOKMARK', bookmark }); // store에 저장된 bookmark 상태 업데이트
          bookmark
            ? alert(`즐겨찾기에 추가되었습니다.`)
            : alert(`즐겨찾기에서 삭제되었습니다.`);
        } else {
          alert(`즐겨찾기 추가에 실패하였습니다.`);
        }
      });
  };
  const handleInfoTab = (e: React.MouseEvent<HTMLElement>): void => {
    console.log('test');
    if (e.currentTarget.id === 'story') {
      const story = true,
        more = false;
      dispatch({ type: 'SET_INFOSTATUS', story, more });
    }
    if (e.currentTarget.id === 'more') {
      const story = false,
        more = true;
      dispatch({ type: 'SET_INFOSTATUS', story, more });
    }
  };
  const handleClickStar = (star: React.MouseEvent<HTMLElement>): void => {
    console.log(star.currentTarget.id);
    if (currentStatus.indexOf(true) !== -1) {
      dispatch({ type: 'SET_STARSTATUS', starStatusInit });
      // axios.post - 서버에 전송, 이때 review status 체크해서 보내야 함
      return;
    }
    const { a, b, c, d, e } = checkStarScore(Number(star.currentTarget.id)); // 별점 dispatch 준비 함수, boolean 객체 돌려줌
    dispatch({ type: 'SET_STARSTATUS', a, b, c, d, e }); // 최초 진입 시 내가 준 별점 store에 저장
    // axios.post - 서버에 전송, 이때 review status 체크해서 보내야 함
  };

  const mainReviewList = (): JSX.Element[] | JSX.Element => {
    //// ======== 작업 중!!!
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
    handleModal(ContentType.UsersReview, true);
  };

  const handleClickAllReviews = (): void => {
    handleModal(ContentType.AllReviews, true);
  };

  // 이하 임시

  const setBeerDetail = (e: React.MouseEvent<HTMLElement>): void => {
    console.log(e.currentTarget); // 클릭 시 타겟 정보 -> 나중에 여기서 id 받아와야 함
    axios
      // .get<IBeerDetailWithAll>(`https://beer4.xyz/beer/${e.currentTarget.id}`) // 여기에 id 붙여서 get 요청
      .get<IBeerDetailWithAll>(`http://localhost:4000/custom/scrap/4`) // 임시 버튼
      .then((res) => {
        console.log(res.data);
        const beerDetail: IBeerDetail = res.data;
        const { bookmark } = res.data;
        const { user_review, user_star, user_input, user_rate } = res.data;
        dispatch({ type: 'SET_BEERDETAIL', beerDetail }); // store에 detail 전달
        dispatch({ type: 'SET_BOOKMARK', bookmark });
        dispatch({
          type: 'SET_USERREVIEW',
          user_review,
          user_star,
          user_input,
          user_rate,
        }); // 삭제, 수정 버튼 추가
        const { a, b, c, d, e } = checkStarScore(user_rate); // 별점 dispatch 준비 함수, boolean 객체 돌려줌
        dispatch({ type: 'SET_STARSTATUS', a, b, c, d, e }); // 최초 진입 시 내가 준 별점 store에 저장
        history.push('/beer/4');
      });
  };
  const setAllReviews = (e: React.MouseEvent<HTMLElement>): void => {
    // store에 전체 리뷰 넣는 함수
    axios.get<aReview>(`http://localhost:4000/custom/mypost/4`).then((res) => {
      const allReviews = res.data;
      dispatch({ type: 'SET_ALLREVIEWS', allReviews });
    }); // [{}, {}]
  };

  // =============

  const handleTag = (): JSX.Element[] => {
    const tags = ['오렌지', '뜨거운 맥주', '벨기에'];
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
      story={story}
      more={more}
      handleInfoTab={handleInfoTab}
      handleTag={handleTag}
      handleStar={handleStar}
      user_review={user_review}
      mainReviewList={mainReviewList}
      handleClickUsersReview={handleClickUsersReview}
      handleClickAllReviews={handleClickAllReviews}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
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
