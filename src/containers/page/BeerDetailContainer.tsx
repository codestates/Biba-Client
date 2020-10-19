import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { BeerDetail } from '../../components/page/BeerDetail';
import { IBeerDetail, ObjBeerDetail } from '../../modules/beerdetail';

export interface MatchParams {
  beerId: string; // number
}
export interface BeerDetailProps extends RouteComponentProps<MatchParams> {
  data: IBeerDetail;
}

const BeerDetailContainer = ({
  match,
  history,
  location,
}: BeerDetailProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { data } = useSelector((state: RootState) => state.beerDetail);

  // 이하 함수는 리스트 페이지에 작성 -> 특정 맥주 클릭 시 get 요청 -> 스토어에 정보 들어감
  const dispatch = useDispatch();
  const setBeerDetail = (data: IBeerDetail) => {
    dispatch({ type: 'SET_BEERDETAIL', data });
  }; // store에 각각 beerdetail 넣는 함수
  const getBeerDetail = (): void => {
    axios
      .get<IBeerDetail>(
        `http://localhost:4000/custom/scrap/${match.params.beerId}`,
      )
      .then((res) => {
        setBeerDetail(res.data);
      });
  };

  return (
    <BeerDetail
      match={match}
      history={history}
      location={location}
      data={data}
    />
  );
};

export const BeerDetailWithRouter = withRouter(BeerDetailContainer);
