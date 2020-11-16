/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { RouterProps, withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import Home from '../../components/page/Home';
import { RootState } from '../../modules';
import { BeerT } from '../../modules/getbeers';
import { ContentType } from '../../modules/modal';
import {
  IBeerDetail,
  beerDetailInit,
  compareBeerInit,
  Bookmark,
  GraphData,
  UserReview,
  aReview,
  StarStatus,
  starStatusInit,
} from '../../modules/beerdetail';
import { checkStarScore } from './pageUtils';
import { User } from '../../modules/user';
import { LoginResponse } from '../user/LoginContainer';

export interface MatchParams {
  id: string;
}
export interface DetailProps {
  setBeerDetail(e: React.MouseEvent<HTMLElement>): void;
  setAllReviews(e: React.MouseEvent<HTMLElement>): void;
}

export interface BeerListProps extends DetailProps {
  beers: BeerT[];
}
export interface BeerProps extends DetailProps {
  id: string;
  key: string;
  name: string;
  image: string;
  rate: number;
}

export type DefaultProps = RouteComponentProps<MatchParams>;
export interface HomeProps extends DefaultProps, DetailProps {}

export interface IBeerDetailWithAll
  extends IBeerDetail,
    Bookmark,
    GraphData,
    UserReview {}
function HomeContainer({
  match,
  history,
  location,
}: DefaultProps): JSX.Element {
  const { disBasic, disStory, disMore } = useSelector(
    (state: RootState) => state.infoDisplay,
  );
  const { token, userData } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  // store에 각각 beerdetail 넣는 함수
  const setBeerDetail = (e: React.MouseEvent<HTMLElement>): void => {
    // console.log(e.currentTarget); // 클릭 시 타겟 정보 -> 나중에 여기서 id 받아와야 함
    dispatch({
      type: 'SET_INFOSTATUS',
      tabBasic: true,
      tabStory: false,
      tabMore: false,
    });
    // console.log('test');
    dispatch({
      type: 'SET_INFODISPLAY',
      disBasic: true,
      disStory: true,
      disMore: true,
    });
    dispatch({ type: 'SET_BEERDETAIL', beerDetail: beerDetailInit.beerDetail });
    dispatch({ type: 'SET_SELECTEDBEER', id: -1 });
    dispatch({
      type: 'SET_COMPAREBEER',
      compareBeer: compareBeerInit.compareBeer,
    });
    axios
      .post<IBeerDetailWithAll>(
        `https://beer4.xyz/beer/${e.currentTarget.id}`,
        {
          user_id: userData.id,
          beer_id: e.currentTarget.id,
        },
      )
      .then((res) => {
        // console.log(res.data);
        const beerDetail: IBeerDetail = res.data;
        dispatch({ type: 'SET_BEERDETAIL', beerDetail: beerDetail }); // store에 detail 전달
        const { bookmark } = res.data;
        dispatch({ type: 'SET_BOOKMARK', bookmark: bookmark });
        const { user_review, user_star, user_input, user_rate } = res.data;
        dispatch({
          type: 'SET_USERREVIEW',
          user_review,
          user_star,
          user_input,
          user_rate,
        });
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

        const { explain, story } = res.data; // ex 있고 story가 없는데
        if (explain === '') {
          dispatch({
            type: 'SET_INFODISPLAY',
            disBasic: false,
            disStory: true,
            disMore: true,
          });
          if (story === '') {
            // 둘 다 없음
            dispatch({
              type: 'SET_INFODISPLAY',
              disBasic: false,
              disStory: false,
              disMore: true,
            });
            dispatch({
              type: 'SET_INFOSTATUS',
              tabBasic: false,
              tabStory: false,
              tabMore: true,
            });
          } else {
            // ex만 없음
            dispatch({
              type: 'SET_INFOSTATUS',
              tabBasic: false,
              tabStory: true,
              tabMore: false,
            });
            dispatch({
              type: 'SET_INFODISPLAY',
              disBasic: false,
              disStory: true,
              disMore: true,
            });
          }
        } else if (story === '') {
          // st만 없음
          dispatch({
            type: 'SET_INFOSTATUS',
            tabBasic: true,
            tabStory: false,
            tabMore: false,
          });
          dispatch({
            type: 'SET_INFODISPLAY',
            disBasic: true,
            disStory: false,
            disMore: true,
          });
        }
      });
  };
  const setAllReviews = (e: React.MouseEvent<HTMLElement>): void => {
    // store에 전체 리뷰 넣는 함수
    axios
      .get<aReview[]>(`https://beer4.xyz/comment/${e.currentTarget.id}`)
      .then((res) => {
        // console.log(res.data);
        const rawReviews = res.data;
        const allReviews = rawReviews.filter((ele) => {
          if (ele.comment !== '') return ele;
        });
        dispatch({ type: 'SET_ALLREVIEWS', allReviews });
      }); // [{}, {}]
  };

  const setLogin = (userData: User, isLogin: boolean, token: string) => {
    dispatch({ type: 'SET_LOGINSTATE', userData, isLogin, token });
  };
  const setProfile = (profile: string) => {
    dispatch({ type: 'SET_PROFILE', profile });
  };

  useEffect(() => {
    axios
      .get<LoginResponse>('https://beer4.xyz/auth', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const { id, nickname, email } = res.data.userData;
          const { token, profile } = res.data;
          // 받은 데이터로 store 상태 업데이트
          setLogin({ id: id, nickname: nickname, email: email }, true, token);
          setProfile(profile);
        } else if (res.status === 404) {
        }
      });
  }, []);

  return (
    <Home
      match={match}
      history={history}
      location={location}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const HomeContainerWithRouter = withRouter(HomeContainer);
