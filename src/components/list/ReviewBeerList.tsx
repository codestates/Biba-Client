import React from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import './TodayCss.css';

import Review from './ReviewBeer';
import { BeerListProps } from '../../containers/page/HomeContainer';

function ReviewList({
  beers,
  setBeerDetail,
  setAllReviews,
}: BeerListProps): JSX.Element {
  const reviewBeerList = beers.map((beer) => (
    <Review
      id={beer.id}
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  ));
  const breakpointColumnsObj = {
    default: 5,
    1200: 4,
    1100: 3,
    800: 2,
    500: 1,
  };
  return (
    <>
      <Title>리뷰 작성한 맥주들</Title>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {reviewBeerList}
      </Masonry>
    </>
  );
}
const Title = styled.h3`
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
  background-color: #f2a405;
  opacity: 0.9;
  color: white;
`;

export default ReviewList;
