import React, { useEffect } from 'react';
import styled from 'styled-components';

import { ModalProps } from '../../containers/nav/ModalContainer';
import { ContentType } from '../../modules/nav';

export const Modal = ({
  display,
  contentType,
  content,
  closeModal,
  pressEsc,
}: ModalProps): JSX.Element => {
  const title = (): string => {
    if (contentType === ContentType.AllReviews) {
      return '리뷰 전체보기';
    } else {
      return '';
    }
  };
  return (
    <>
      <Container
        className='modalContainer'
        style={{ display: display ? 'block' : 'none' }}
      >
        <ModalMask className='modalMask' onClick={closeModal}></ModalMask>
        <ContentArea className='contentArea'>
          <TitleWrap className='modalTitleWrap'>
            <Title>{title()}</Title>
            <CloseBtn className='closeBtn' onClick={closeModal}>
              x
            </CloseBtn>
          </TitleWrap>
          <ContentWrap className='modalContentWrap'>
            <Content className='modalContent'>{content}</Content>
          </ContentWrap>
        </ContentArea>
      </Container>
    </>
  );
};

const Container = styled.div`
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
  width: 60vw;
  min-width: 800px;
  max-width: 1100px;
  margin: 15% auto;
  padding: 15px 15px 20px 15px;
`;
const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const Title = styled.div`
  display: flex;
  font-weight: 600;
`;

const CloseBtn = styled.div`
  display: flex;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: black;
    text-decoration: none;
  }
  padding: 0 20px 0 0;
`;

const ContentWrap = styled.div`
  display: flex;
  align-self: center;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
