import React from 'react';
import styled from 'styled-components';

import FavoriteBeer from './FavoriteBeer';
import { BeerI } from '../../modules/getbeers';

function FavoriteBeerList({ beers }: BeerI): JSX.Element {
  const favoriteBeerList = beers.map((beer) => (
    <FavoriteBeer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
    />
  ));
  return <BeerList>{favoriteBeerList}</BeerList>;
}

const BeerList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
`;

export default FavoriteBeerList;
