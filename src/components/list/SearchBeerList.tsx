import React from 'react';
import styled from 'styled-components';

import { BeerI } from '../../modules/getbeers';
import SearchBeer from './SearchBeer';
import RequsetBeer from './RequestBeer';

interface SearchBeerProps extends BeerI {
  setBeerDetail(e: React.MouseEvent<HTMLElement>): void;
}

function SearchBeerList({
  beers,
  setBeerDetail,
}: SearchBeerProps): JSX.Element {
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
