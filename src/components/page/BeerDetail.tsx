import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import { BeerDetailProps } from '../../containers/page/BeerDetailContainer';

export const BeerDetail = ({
  match,
  beerDetail,
  bookmark,
  handleBookmark,
  story,
  more,
  handleInfoTab,
  handleStar,
  handleClickAllReviews,
  setBeerDetail,
}: BeerDetailProps): JSX.Element => {
  const { id } = match.params;
  // const example = 'https://bit.ly/2T6JRuE';
  const example =
    'https://flagshipfebruary.com/wp-content/uploads/hero-19-02-01-samadams-1600x800.jpg';

  return (
    <Outer>
      <Container className='detailContainer'>
        <InfoArea className='infoArea'>
          <ImgDiv>
            <InfoImg className='infoImg' src={example} alt='' />
          </ImgDiv>
          <InfoDiv className='infoDiv'>
            <InfoTitle className='infoTitle'>맥주 상세 정보</InfoTitle>
            <FavToggle className='favToggle'>
              즐겨찾기
              <input
                type='checkbox'
                onChange={handleBookmark}
                checked={bookmark}
              ></input>
            </FavToggle>
            <InfoSub className='infoSub'>
              <BeerName className='beerName'>{beerDetail.beer_name}</BeerName>
              <Average className='beerAverage'>
                별점 평균 {beerDetail.rate}
              </Average>
              <Tag className='beerTag'>오렌지, 뜨거운 맥주, 벨기에</Tag>
            </InfoSub>
            <InfoBody className='infoBody'>
              <Tab className='infoTab'>
                <Tab1 id='story' onClick={handleInfoTab}>
                  맥주 스토리&nbsp;&nbsp;|&nbsp;
                </Tab1>
                <Tab2 id='more' onClick={handleInfoTab}>
                  &nbsp;상세 정보
                </Tab2>
              </Tab>
              <InfoDetail1
                className='infoDetail'
                style={story ? { display: 'block' } : { display: 'none' }}
              >
                <P className='content'>이 맥주에는 이런 전설이 있습니다</P>
              </InfoDetail1>
              <InfoDetail2
                className='infoDetail'
                style={more ? { display: 'block' } : { display: 'none' }}
              >
                <P className='content'>제조사: {beerDetail.company}</P>
                <P className='content'>제조국: {beerDetail.country}</P>
                <P className='content'>스타일: {beerDetail.style_name}</P>
                <P className='content'>ABV : {beerDetail.abv}</P>
                <P className='content'>IBU: {beerDetail.ibu}</P>
              </InfoDetail2>
            </InfoBody>
          </InfoDiv>
        </InfoArea>
        <RatingArea className='ratingArea'>
          <Rate className='rate'>별점 주기</Rate>
          <Stars className='stars'>{handleStar()}</Stars>
        </RatingArea>
        <CommentArea className='commentArea'>
          <WriteComment className='commentBtn'>리뷰 작성하기</WriteComment>
          <CommentAll className='commentAllBtn' onClick={handleClickAllReviews}>
            리뷰 전체보기
          </CommentAll>
          <button onClick={setBeerDetail}>임시 상세페이지 로딩</button>
        </CommentArea>
      </Container>
    </Outer>
  );
}; // 별점주기 마무리, info display

const Outer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 2em 0 2em 2em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InfoArea = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;

  width: 30em;
  height: 30em;

  @media (max-width: 1320px) {
    border: 1px solid purple;
  }
  @media (min-width: 1920px) {
    border: 1px solid yellow;
  }

  margin: 0 2em 0 0;
  border: 1px solid black;
`;
const InfoImg = styled.img`
  display: flex;
  justify-self: center;
  align-self: center;

  max-height: 30em;
  max-width: 30em;
  padding: 2em 0 2em 0;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.p`
  font-size: 1.4em;
`;

const FavToggle = styled.div``;

const InfoSub = styled.div``;
const InfoBody = styled.div``;

const BeerName = styled.p``;
const Average = styled.p`
  font-size: 1.2em;
`;
const Tag = styled.p``;
const P = styled.p``;

const Tab = styled.div`
  display: flex;
  font-size: 1.2em;
`;
const Tab1 = styled.p`
  cursor: pointer;
`;
const Tab2 = styled.p`
  cursor: pointer;
`;
const InfoDetail1 = styled.div``;
const InfoDetail2 = styled.div``;

const RatingArea = styled.div`
  display: flex;
  align-items: center;
`;
const Rate = styled.p``;
const Stars = styled.div`
  display: flex;
`;
const CommentArea = styled.div``;

const WriteComment = styled.button``;
const CommentAll = styled.button``;
