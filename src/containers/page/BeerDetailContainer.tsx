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
  lightGrey3,
} from '../../components/nav/color';

import {
  SingleComment,
  MainWrap,
  UserWrap,
  ProfileWrap,
  Profile,
  PIcon,
  Nickname,
  RateWrap,
  URStar,
  UserRate,
  Comment,
  ReviewRate,
  DateString,
} from '../modal/ModalContainer';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';
import { BeerDetail } from '../../components/page/BeerDetail';
import { Bookmark, IBeerDetail, aReview } from '../../modules/beerdetail';
import { BeerT, BEER_FAVORITE_ABC, BEER_REVIEW } from '../../modules/getbeers';
import {
  DefaultProps,
  IBeerDetailWithAll,
} from '../../containers/page/HomeContainer';
import { checkStarScore } from './pageUtils';

export interface BeerDetailProps extends DefaultProps {
  beerDetail: IBeerDetail;
  compareMyBeers(): void;
  bookmark: boolean;
  handleBookmark(): void;
  handleTag(): JSX.Element[] | boolean;
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

  // 이하 함수는 리스트 페이지에 작성 -> 특정 맥주 클릭 시 get 요청 -> 스토어에 정보 들어감
  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };

  const compareMyBeers = (): void => {
    if (!isLogin) {
      // alert(`로그인 후 이용해주세요.`);
      handleModal(ContentType.Login, true);
      return;
    }
    axios
      .post<BeerT[]>(`https://beer4.xyz/bookmark/abc`, {
        token: token,
      })
      .then((res) => {
        const favBeers = res.data;
        dispatch({ type: BEER_FAVORITE_ABC, beers: favBeers });

        axios
          .post<BeerT[]>(`https://beer4.xyz/comment/mylist`, {
            token: token,
          })
          .then((res) => {
            const reviewedBeers = res.data;
            dispatch({ type: BEER_REVIEW, beers: reviewedBeers });
          });
      });
    dispatch({ type: 'SET_MYBEERTYPE', option1: true, option2: false });
    dispatch({
      type: 'SET_MODAL',
      contentType: ContentType.MyBeerList,
      display: true,
    });
  };

  const handleBookmark = (): void => {
    if (!isLogin) {
      // alert(`로그인 후 이용해주세요.`);
      handleModal(ContentType.Login, true);
      return;
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
          // bookmark
          //   ? alert(`즐겨찾기에 추가되었습니다.`)
          //   : alert(`즐겨찾기에서 삭제되었습니다.`);
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
  const setDateForm = (input: string): string => {
    const [date, time] = input.split(' ');
    const dateOutput = date.replace('-', '년 ').replace('-', '월 ') + '일';
    return `${dateOutput}`;
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
              <DetailSingleCommentGrid>
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
                <Comment className='comment'>{ele.comment}</Comment>

                <ReviewRate>
                  <DateString>{setDateForm(ele.createdAt)}</DateString>

                  <RateWrap className='rateWrap'>
                    <URStar className='userRateStar' />
                    <UserRate className='userRate'>{ele.rate}</UserRate>
                  </RateWrap>
                </ReviewRate>
              </DetailSingleCommentGrid>
            </MainWrap>
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
      // alert(`로그인 후 이용해주세요.`);
      handleModal(ContentType.Login, true);
      return;
    }
    handleModal(ContentType.UsersReview, true);
  };

  const handleClickAllReviews = (): void => {
    handleModal(ContentType.DetailAllReviews, true);
  };

  const handleClickTag = (e: React.MouseEvent<HTMLElement>): void => {
    axios
      .post(`https://beer4.xyz/search/tag`, {
        tag: e.currentTarget.id,
      })
      .then((res) => {
        const beers = res.data;
        dispatch({ type: 'SET_BEERS', beers: beers });
        dispatch({ type: 'SEARCH_BEER' });
        dispatch({ type: 'SET_NAVDISPLAY', display: true });
        history.push('/');
      });
  };

  const handleTag = (): JSX.Element[] | boolean => {
    const { tags } = beerDetail;
    return tags.length !== 0
      ? tags.map((ele) => {
          return (
            <Tag
              id={ele}
              key={`tag${tags.indexOf(ele)}`}
              className='beerTag'
              onClick={handleClickTag}
            >
              {ele}
            </Tag>
          );
        })
      : false;
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
          onClick={handleClickUsersReview}
        >
          <FStar style={ele[0] ? { display: 'block' } : { display: 'none' }} />
          <EStar
            style={
              !ele[0]
                ? isLogin
                  ? { display: 'block' }
                  : { display: 'block', color: `${lightGrey3}` }
                : { display: 'none' }
            }
          />
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
      compareMyBeers={compareMyBeers}
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
const DetailSingleCommentGrid = styled.div`
  display: grid;
  grid-template-rows: 20% auto 20%;
  height: 180px;
`;

const DetailNoComment = styled(SingleComment)`
  justify-content: center;
  align-items: center;
  width: 100%;

  border: 2px solid ${mainYellowOpac};

  margin: 0 0.2em 0 0.2em;
`;
