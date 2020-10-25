import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CgCloseO } from 'react-icons/cg';

import { ModalProps } from '../../containers/nav/ModalContainer';
import { ContentType } from '../../modules/nav';
import { mainGrey, mainGreyOpac, mainYellow } from '../../components/nav/color';

export const Modal = ({
  display,
  contentType,
  content,
  user_review,
  closeModal,
  pressEsc,
}: ModalProps): JSX.Element => {
  const title = (): string => {
    if (contentType === ContentType.MypageAllReviews) {
      return '내가 작성한 리뷰';
    } else if (contentType === ContentType.ChangeNickname) {
      return '닉네임 변경하기';
    } else if (contentType === ContentType.UsersReview && !user_review) {
      return '리뷰 작성하기';
    } else if (contentType === ContentType.UsersReview && user_review) {
      return '리뷰 수정하기';
    } else if (contentType === ContentType.AllReviews) {
      return '리뷰 전체보기';
    } else if (contentType === ContentType.RequestBeer) {
      return '맥주 등록 요청하기';
    } else {
      return '';
    }
  };
  return (
    <>
      <Container
        className='modalContainer'
        style={display ? { display: 'block' } : undefined}
      >
        <ModalMask className='modalMask' onClick={closeModal}></ModalMask>
        {contentType === ContentType.UsersReview ||
        contentType === ContentType.Login ||
        contentType === ContentType.RequestBeer ? (
          <SmallContentArea className='contentArea'>
            <TitleWrap className='modalTitleWrap'>
              <Title>{title()}</Title>
              <CloseBtn className='closeBtn' onClick={closeModal} />
            </TitleWrap>
            <ContentWrap className='modalContentWrap'>{content}</ContentWrap>
          </SmallContentArea>
        ) : (
          <ContentArea className='contentArea'>
            <TitleWrap className='modalTitleWrap'>
              <Title>{title()}</Title>
              <CloseBtn className='closeBtn' onClick={closeModal} />
            </TitleWrap>
            <ContentWrap className='modalContentWrap'>
              <Content className='modalContent'>{content}</Content>
            </ContentWrap>
          </ContentArea>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: none;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalMask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
`;

const ContentArea = styled.div`
  position: relative; /* 넣어줘야 mask에 포함되지 않음 */
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  border: 1px solid #888;
  border-radius: 16px;
  width: 60vw;
  min-width: 800px;
  max-width: 1100px;
  margin: 15% auto;
  padding: 15px 15px 20px 15px;
`;

const SmallContentArea = styled(ContentArea)`
  width: 560px;
  min-width: 560px;
  max-width: 560px;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0.3em 0.5em 0.4em 0.5em;
`;

const Title = styled.div`
  display: flex;
  font-size: 1.2em;
  font-weight: 600;

  color: ${mainYellow};
`;

const CloseBtn = styled(CgCloseO)`
  display: flex;
  width: 1.9em;
  height: 1.9em;

  &:hover {
    cursor: pointer;
    color: #989898;
    text-decoration: none;
  }
  color: ${mainGrey};
`;

const ContentWrap = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
