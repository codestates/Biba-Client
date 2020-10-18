import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { Modal } from '../../components/nav/Modal';
import { myReviewsReducer } from '../../modules/user';

export interface ModalProps {
  display: boolean;
  content: JSX.Element | JSX.Element[];
  closeModal(): void;
}

export const ModalContainer = (props: RouterProps): JSX.Element => {
  // modal이 필요한 각 페이지에서 상황에 맞게 dispatch
  // 1. modal display -> true, false 지정
  // 2. 어떤 콘텐츠가 나와야하는지에 따라 ContentType 지정
  const { contentType, display } = useSelector(
    (state: RootState) => state.modal,
  );
  const { myReviews } = useSelector((state: RootState) => state.myReviews);
  const dispatch = useDispatch();

  const content = (contentType: ContentType): JSX.Element | JSX.Element[] => {
    // 이 함수의 결과가 component의 Modals로 넘어감
    if (contentType === ContentType.Empty) {
      return <>this is login modal part</>;
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
    if (contentType === ContentType.Login) {
      return <>this is login modal part</>;
    }

    return <div>error</div>;
  };

  const handleModalClose = (
    contentType: ContentType,
    display: boolean,
  ): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const closeModal = (): void => {
    handleModalClose(ContentType.Empty, false);
  };

  return (
    <Modal
      display={display}
      content={content(contentType)}
      closeModal={closeModal}
    />
  );
};

export const ModalContainerWithRouter = withRouter(ModalContainer);
