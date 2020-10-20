import React from 'react';
import styled from 'styled-components';

import TodayBeer from './TodayBeer';
import { BeerT } from '../../modules/getbeer';

interface Props {
  beers: BeerT[];
  getBeerDetail(e: React.MouseEvent<HTMLElement>): void;
}

function TodayBeerList({ beers, getBeerDetail }: Props): JSX.Element {
  const todayBeerList = beers.map((beer) => (
    <TodayBeer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      getBeerDetail={getBeerDetail}
    />
  ));
  return <BeerList>{todayBeerList}</BeerList>;
}

const BeerList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
`;

export default TodayBeerList;
