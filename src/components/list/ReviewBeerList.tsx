import React from 'react';
import styled from 'styled-components';

import Review from './ReviewBeer';
import { BeerI } from '../../modules/getbeers';
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
  return (
    <Container>
      <ListContainer>
        <Title>리뷰 작성한 맥주들</Title>
        {reviewBeerList}
      </ListContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const ListContainer = styled.div``;

const Title = styled.h3`
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
  background-color: #f2a405;
  opacity: 0.9;
  color: white;
`;

// const Categories = styled.ul`
//   list-style: none;
// `;

// const Category = styled.li`
//   margin-bottom: 1em;
//   margin-right: 3em;
// `;

export default ReviewList;
