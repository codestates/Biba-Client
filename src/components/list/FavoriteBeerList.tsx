import React from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import './TodayCss.css';

import FavoriteBeer from './FavoriteBeer';
import { BeerI } from '../../modules/getbeers';

function FavoriteBeerList({ beers }: BeerI): JSX.Element {
  const favoriteBeerList = beers.map((beer) => (
    <FavoriteBeer
      id={beer.id}
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
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
      <Title>즐겨찾는 맥주들</Title>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {favoriteBeerList}
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

export default FavoriteBeerList;
