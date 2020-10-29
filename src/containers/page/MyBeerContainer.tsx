import React from 'react';
import { RouterProps, withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import MyBeer from '../../components/page/MyBeer';
import Home from '../../components/page/Home';
import { RootState } from '../../modules';
import { BeerT } from '../../modules/getbeers';
import { ContentType } from '../../modules/nav';
import {
  IBeerDetail,
  beerDetailInit,
  Bookmark,
  GraphData,
  UserReview,
  aReview,
  StarStatus,
  starStatusInit,
} from '../../modules/beerdetail';
import { checkStarScore } from './pageUtils';
import { DefaultProps, IBeerDetailWithAll } from './HomeContainer';

function MyBeerContainer({
  match,
  history,
  location,
}: DefaultProps): JSX.Element {
  const { disBasic, disStory, disMore } = useSelector(
    (state: RootState) => state.infoDisplay,
  );
  const { userData } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  // store에 각각 beerdetail 넣는 함수
  const setBeerDetail = (e: React.MouseEvent<HTMLElement>): void => {
    console.log(e.currentTarget); // 클릭 시 타겟 정보 -> 나중에 여기서 id 받아와야 함
    dispatch({
      type: 'SET_INFOSTATUS',
      tabBasic: true,
      tabStory: false,
      tabMore: false,
    });
    dispatch({ type: 'SET_BEERDETAIL', beerDetailInit });
    axios
      .post<IBeerDetailWithAll>(
        `https://beer4.xyz/beer/${e.currentTarget.id}`,
        {
          user_id: userData.id,
          beer_id: e.currentTarget.id,
        },
      )
      .then((res) => {
        console.log(res.data);
        const beerDetail: IBeerDetail = res.data;
        dispatch({ type: 'SET_BEERDETAIL', beerDetail }); // store에 detail 전달
        const { bookmark } = res.data;
        dispatch({ type: 'SET_BOOKMARK', bookmark });
        const { user_review, user_star, user_input, user_rate } = res.data;
        dispatch({
          type: 'SET_USERREVIEW',
          user_review,
          user_star,
          user_input,
          user_rate,
        }); // 삭제, 수정 버튼 추가
        const { sparkling, sweet, bitter, accessibility, body } = res.data;
        dispatch({
          type: 'SET_GRAPHDATA',
          sparkling,
          sweet,
          bitter,
          accessibility,
          body,
        });
        const { a, b, c, d, e } = checkStarScore(user_rate); // 별점 dispatch 준비 함수, boolean 객체 돌려줌
        dispatch({ type: 'SET_STARSTATUS', a, b, c, d, e }); // 최초 진입 시 내가 준 별점 store에 저장
        history.push(`/beer/${res.data.id}`);

        const { explain, story } = res.data;
        if (explain === '') {
          dispatch({
            type: 'SET_INFODISPLAY',
            disBasic: false,
            disStory,
            disMore,
          });
          dispatch({
            type: 'SET_INFOSTATUS',
            tabBasic: false,
            tabStory: true,
            tabMore: false,
          });
        }
        if (story === '') {
          dispatch({
            type: 'SET_INFODISPLAY',
            disBasic,
            disStory: false,
            disMore,
          });
          if (explain === '') {
            dispatch({
              type: 'SET_INFOSTATUS',
              tabBasic: false,
              tabStory: false,
              tabMore: true,
            });
          }
        }
      });
  };
  const setAllReviews = (e: React.MouseEvent<HTMLElement>): void => {
    // store에 전체 리뷰 넣는 함수
    axios
      .get<aReview[]>(`https://beer4.xyz/comment/${e.currentTarget.id}`)
      .then((res) => {
        console.log(res.data);
        const rawReviews = res.data;
        const allReviews = rawReviews.filter((ele) => {
          if (ele.comment !== '') return ele;
        });
        dispatch({ type: 'SET_ALLREVIEWS', allReviews });
      }); // [{}, {}]
  };
  return (
    <MyBeer
      match={match}
      history={history}
      location={location}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const MyBeerContainerWithRouter = withRouter(MyBeerContainer);
