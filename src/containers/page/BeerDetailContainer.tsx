import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { BeerDetail } from '../../components/page/BeerDetail';
import { IBeerDetail, aReview } from '../../modules/beerdetail';
import { DefaultProps } from '../../containers/page/HomeContainer';

export interface BeerDetailProps extends DefaultProps {
  beerDetail: IBeerDetail;
  handleClickAllReviews(): void;
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

  // 이하 함수는 리스트 페이지에 작성 -> 특정 맥주 클릭 시 get 요청 -> 스토어에 정보 들어감
  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const handleClickAllReviews = (): void => {
    handleModal(ContentType.AllReviews, true);
  };

  return (
    <BeerDetail
      match={match}
      history={history}
      location={location}
      beerDetail={beerDetail}
      handleClickAllReviews={handleClickAllReviews}
    />
  );
};

export const BeerDetailWithRouter = withRouter(BeerDetailContainer);
