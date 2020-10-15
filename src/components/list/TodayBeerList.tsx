import React from 'react';
import styled from 'styled-components';

import { Beer } from './Beer';
import { BeerT } from '../../modules/getbeer';

interface Props {
  beers: BeerT[];
  getBeer: () => void;
}

function TodayBeerList({ beers }: Props): JSX.Element {
  const todayBeerList = beers.map((beer) => (
    <Beer
      key={beer.id}
      // isloading={isloading}
      // name={beer.beer_name}
      // image={beer.beer_img}
      // rate={beer.rate}
    />
  ));
  return <BeerList>{todayBeerList}</BeerList>;
}

const BeerList = styled.div`
  height: 100%;
  overflow-y: scroll;
  column-count: 5;
  width: 80%;
  margin: 0 auto;
`;

export default TodayBeerList;
