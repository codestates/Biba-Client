import React from 'react';
import styled from 'styled-components';

import { BeerDetailProps } from '../../containers/page/BeerDetailContainer';

export const BeerDetail = ({
  match,
  beerDetail,
  handleClickAllReviews,
}: BeerDetailProps): JSX.Element => {
  const { id } = match.params;
  const example = 'https://bit.ly/2T6JRuE';

  return (
    <Container>
      <InfoArea>
        <InfoImg src={example} alt='' />
        <InfoDiv>
          <InfoTitle>맥주 상세 정보</InfoTitle>
          <FavToggle>
            즐겨찾기<input type='checkbox'></input>
          </FavToggle>
          <InfoSub>
            <H2>{beerDetail.beer_name}</H2>
            <H4>별점 평균{beerDetail.rate}</H4>
            <H4>오렌지, 뜨거운 맥주, 벨기에</H4>
          </InfoSub>
          <Info>
            <InfoDetail1>
              <H4>맥주 스토리</H4>
              <P>이 맥주에는 이런 전설이 있습니다</P>
            </InfoDetail1>
            <InfoDetail2>
              <H4>상세 정보</H4>
              <P>제조사: {beerDetail.company}</P>
              <P>제조국: {beerDetail.country}</P>
              <P>스타일: {beerDetail.style_name}</P>
              <P>
                ABV / IBU: {beerDetail.abv} / {beerDetail.ibu}
              </P>
            </InfoDetail2>
          </Info>
        </InfoDiv>
      </InfoArea>
      <RatingArea>별점주기</RatingArea>
      <CommentArea></CommentArea>
      <WriteComment>리뷰 작성하기</WriteComment>
      <CommentAll onClick={handleClickAllReviews}>리뷰 전체보기</CommentAll>
    </Container>
  );
};

const Container = styled.div``;

const InfoArea = styled.div`
  display: flex;
`;
const InfoImg = styled.img``;
const InfoDiv = styled.div``;

const InfoTitle = styled.h2``;

const FavToggle = styled.div``;

const InfoSub = styled.div``;
const Info = styled.div``;

const H2 = styled.h2``;
const H4 = styled.h4`
  font-size: 1.2em;
`;
const P = styled.p``;

const InfoDetail1 = styled.div``;
const InfoDetail2 = styled.div``;

const RatingArea = styled.div``;
const CommentArea = styled.div``;

const WriteComment = styled.button``;
const CommentAll = styled.button``;
