import React from 'react';
import styled from 'styled-components';

import TodayBeer from './TodayBeer';
import { BeerT } from '../../modules/getbeers';
import { DetailProps } from '../../containers/page/HomeContainer';

interface Props extends DetailProps {
  beers: BeerT[];
}

function TodayBeerList({
  beers,
  setBeerDetail,
  setAllReviews,
}: Props): JSX.Element {
  const todayBeerList = beers.map((beer) => (
    <TodayBeer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
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
