import React from 'react';
import { RouterProps, withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import Home from '../../components/page/Home';
import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav';
import { IBeerDetail, aReview } from '../../modules/beerdetail';

export interface MatchParams {
  id: string;
}
export type DefaultProps = RouteComponentProps<MatchParams>;
export interface HomeProps extends DefaultProps {
  setBeerDetail(e: React.MouseEvent<HTMLElement>): void;
  setAllReviews(e: React.MouseEvent<HTMLElement>): void;
}

function HomeContainer({
  match,
  history,
  location,
}: DefaultProps): JSX.Element {
  const dispatch = useDispatch();
  // store에 각각 beerdetail 넣는 함수
  const setBeerDetail = (e: React.MouseEvent<HTMLElement>): void => {
    console.log(e.currentTarget); // 클릭 시 타겟 정보 -> 나중에 여기서 id 받아와야 함
    axios
      .get<IBeerDetail>(`http://localhost:4000/custom/scrap/4`) // 여기에 id 붙여서 get 요청
      .then((res) => {
        console.log(res.data);
        const beerDetail = res.data;
        dispatch({ type: 'SET_BEERDETAIL', beerDetail }); // store에 detail 전달
        history.push('/beer/4'); // id 붙은 주소로 push, id 붙일지 말지 한번 더 논의 가능할 듯(그냥 /beer도 가능할 것으로 보임)
      });
  };
  const setAllReviews = (e: React.MouseEvent<HTMLElement>): void => {
    // store에 전체 리뷰 넣는 함수
    axios.get<aReview>('http://localhost:4000/custom/mypost/4').then((res) => {
      const allReviews = res.data;
      dispatch({ type: 'SET_ALLREVIEWS', allReviews });
    }); // [{}, {}]
  };

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
