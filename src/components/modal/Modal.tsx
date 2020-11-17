import React from 'react';
import styled from 'styled-components';
import { CgCloseO } from 'react-icons/cg';

import { ModalProps } from '../../containers/modal/ModalContainer';
import { ContentType } from '../../modules/modal';
import { mainGrey, mainGreyOpac, mainYellow } from '../nav/color';

import { LoginContainerWithRouter } from '../../containers/user/LoginContainer';
import { FooterContainerithRouter } from '../../containers/nav/FooterContainer';

export const Modal = ({
  modalDisplay,
  closeModal,
  user_review,
  contentType,
  content,
  mobileContent,
  myReviews,
  allReviews,
  sideMenuDisplay,
  bottomModalDisplay,
  handleClickHiddenMenu,
  handleBottomModal,
}: ModalProps): JSX.Element => {
  const title = (): string => {
    if (contentType === ContentType.ChangeNickname) {
      return '닉네임 변경하기';
    } else if (contentType === ContentType.MyPageAllRates) {
      return '별점 준 맥주';
    } else if (contentType === ContentType.MyPageAllReviews) {
      return '내가 작성한 리뷰';
    } else if (contentType === ContentType.MyBeerList) {
      return '맥주 비교하기';
    } else if (contentType === ContentType.UsersReview && !user_review) {
      return '별점 & 리뷰 등록하기';
    } else if (contentType === ContentType.UsersReview && user_review) {
      return '리뷰 수정하기';
    } else if (contentType === ContentType.DetailAllReviews) {
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
        style={modalDisplay ? { display: 'block' } : undefined}
      >
        <ModalMask className='modalMask' onClick={closeModal}></ModalMask>
        {contentType === ContentType.Login ||
        contentType === ContentType.ChangeNickname ||
        contentType === ContentType.MyBeerList ||
        contentType === ContentType.UsersReview ||
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
              {(contentType === ContentType.DetailAllReviews &&
                allReviews.length !== 0) ||
              (contentType === ContentType.MyPageAllReviews &&
                myReviews.length !== 0) ||
              (contentType === ContentType.MyPageAllRates &&
                myReviews.length !== 0) ? (
                <AllReviewsContent className='modalContent'>
                  {content}
                </AllReviewsContent>
              ) : (
                <Content className='modalContent'>{content}</Content>
              )}
            </ContentWrap>
          </ContentArea>
        )}
      </Container>

      <MobileContainer
        className='mobileModalContainer'
        style={bottomModalDisplay ? { display: 'block' } : undefined}
      >
        <MobileMask
          className='modalMask'
          onClick={() => {
            closeModal();
            handleClickHiddenMenu(false);
            handleBottomModal(ContentType.Empty, false);
          }}
          style={
            sideMenuDisplay || bottomModalDisplay
              ? {
                  opacity: 1,
                  visibility: 'visible',
                  transition: 'visibility 0.8s linear, opacity 0.8s linear',
                }
              : {
                  opacity: 0,
                  visibility: 'hidden',
                  transition: 'visibility 0.8s linear, opacity 0.8s linear',
                }
          }
        ></MobileMask>
        <MobileModal
          style={bottomModalDisplay ? { bottom: '0' } : { bottom: '-100%' }}
        >
          <CloseBtn
            onClick={() => {
              handleClickHiddenMenu(false);
              handleBottomModal(ContentType.Empty, false);
            }}
          />
          <ContentWrap className='mobileModalContentWrap'>
            {mobileContent}
          </ContentWrap>
          <SubFooter
            style={
              bottomModalDisplay ? { bottom: '25px' } : { bottom: '-100%' }
            }
          >
            <FooterContainerithRouter />
          </SubFooter>
        </MobileModal>
      </MobileContainer>
    </>
  );
};

const MobileContainer = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`;
const MobileMask = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    z-index: 8;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    color: ${mainGrey};
  }
`;
const MobileModal = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;

    position: fixed;
    z-index: 10;
    overflow-y: hidden;
    overflow: hidden;
    left: 0;
    height: 90vh;
    width: 100vw;

    border-radius: 24px 24px 0 0;

    background-color: white;
    box-shadow: -5px 0 1em rgba(0, 0, 0, 0.1);
    transition: bottom 0.8s ease-in;
  }
`;
const SubFooter = styled.div`
  display: none;
  position: fixed;
  right: 25px;
  transition: bottom 0.8s ease-in;
  @media (max-width: 768px) {
    display: block;
  }
  @media (max-width: 360px) {
    bottom: 20px;
  }
`;

const Container = styled.div`
  display: none;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: initial;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  color: ${mainGrey};

  animation: fadein 0.7s;
  -moz-animation: fadein 0.7s;
  -webkit-animation: fadein 0.7s;
  -o-animation: fadein 0.7s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
  max-height: 60vh;
  overflow-y: scroll;
  min-width: 800px;
  max-width: 1020px;
  margin: 12% auto;
  padding: 15px 15px 20px 15px;
`;
const SmallContentArea = styled(ContentArea)`
  width: 560px;
  min-width: 560px;
  max-width: 560px;
  overflow-y: auto;
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
  @media (max-width: 425px) {
    display: flex;
    width: 1.6em;
    height: 1.6em;

    margin: 1em 0 0 1em;
  }
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

const ContentWrap = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
`;
const AllReviewsContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  justify-self: center;
  flex-wrap: wrap;

  width: 742px;
  @media (min-width: 1720px) {
    width: 100%;
    margin: 0;
  }
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
