import React from 'react';
import styled from 'styled-components';

import { BeerT } from '../../modules/getbeer';
import SearchBeer from './SearchBeer';

interface SearchBeerProps {
  beers: BeerT[];
  getBeerDetail(e: React.MouseEvent<HTMLElement>): void;
}

function SearchBeerList({
  beers,
  getBeerDetail,
}: SearchBeerProps): JSX.Element {
  const searchBeerList = beers.map((beer) => (
    <SearchBeer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
    />
  ));
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
