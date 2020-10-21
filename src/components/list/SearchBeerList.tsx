import React from 'react';
import styled from 'styled-components';

import { BeerI } from '../../modules/getbeers';
import SearchBeer from './SearchBeer';
import RequsetBeer from './RequestBeer';

function SearchBeerList({ beers }: BeerI): JSX.Element {
  if (beers.length !== 0) {
    const searchBeerList = beers.map((beer) => (
      <SearchBeer
        key={beer.id}
        name={beer.beer_name}
        image={beer.beer_img}
        rate={beer.rate}
      />
    ));
  }

  const searchBeerList = <RequsetBeer />;

  return <BeerList>{searchBeerList}</BeerList>;
}

const BeerList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
`;
export default SearchBeerList;
