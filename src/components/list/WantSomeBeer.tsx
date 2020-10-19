import React from 'react';
import styled from 'styled-components';

import Beer from './Beer';
import { BeerT } from '../../modules/getbeer';

interface Props {
  beers: BeerT[];
}

function WantSomeBeer({ beers }: Props): JSX.Element {
  const todayBeerList = beers.map((beer) => (
    <Beer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
    />
  ));
  return <BeerList>{todayBeerList}</BeerList>;
}

const BeerList = styled.div`
  height: 100%;
  overflow-y: scroll;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
`;

export default WantSomeBeer;
