import React from 'react';
import styled from 'styled-components';

import { ModalProps } from '../../containers/nav/Modal';

export const Modal = ({
  display,
  content,
  closeModal,
}: ModalProps): JSX.Element => {
  return (
    <>
      <Container
        className='modalContainer'
        style={{ display: display ? 'block' : 'none' }}
      >
        <ModalMask className='modalMask' onClick={closeModal}></ModalMask>
        <ContentArea className='contentArea'>
          <CloseBtn className='closeBtn' onClick={closeModal}>
            x
          </CloseBtn>
          <Content>{content}</Content>
        </ContentArea>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 1;
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
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
`;

const CloseBtn = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: black;
    text-decoration: none;
  }
`;

const Content = styled.div``;
