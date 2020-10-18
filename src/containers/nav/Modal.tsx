import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { Modal } from '../../components/nav/Modal';
import { myReviewsReducer } from '../../modules/user';

export interface ModalProps {
  content: JSX.Element | JSX.Element[];
}

export const ModalContainer = (props: RouterProps): JSX.Element => {
  // modal이 필요한 각 페이지에서 상황에 맞게 dispatch
  // 1. modal display -> true, false 지정
  // 2. 어떤 콘텐츠가 나와야하는지에 따라 ContentType 지정
  const { contentType } = useSelector((state: RootState) => state.modal);
  const { myReviews } = useSelector((state: RootState) => state.myReviews);

  const content = (contentType: ContentType): JSX.Element | JSX.Element[] => {
    if (contentType === ContentType.Empty) {
      return <div>modal empty</div>;
    }
    if (contentType === ContentType.MypageAllReviews) {
      return myReviews.length !== 0 ? (
        myReviews.map((ele: { message: string }) => (
          <div key={myReviews.indexOf(ele)}>{ele.message}</div>
        ))
      ) : (
        <div>작성한 리뷰가 없습니다.</div>
      );
    }

    return <div>error</div>;
  };

  return <Modal content={content(contentType)} />;
};

export const ModalContainerWithRouter = withRouter(ModalContainer);
