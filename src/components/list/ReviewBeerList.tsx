import React from 'react';
import styled from 'styled-components';

import Review from './ReviewBeer';
import { BeerI } from '../../modules/getbeers';

function ReviewList({ beers }: BeerI): JSX.Element {
  const reviewBeerList = beers.map((beer) => (
    <Review
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
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
  color: gold;
  border-bottom: 1px solid gray;
`;

// const Categories = styled.ul`
//   list-style: none;
// `;

// const Category = styled.li`
//   margin-bottom: 1em;
//   margin-right: 3em;
// `;

export default ReviewList;
