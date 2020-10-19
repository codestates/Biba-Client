import React from 'react';
import styled from 'styled-components';

import WantSomeBeer from './WantSomeBeer';
import { BeerT } from '../../modules/getbeer';

interface Props {
  beers: BeerT[];
}

function WantSomeBeerList({ beers }: Props): JSX.Element {
  const hotBeerList = beers.map((beer) => (
    <WantSomeBeer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
    />
  ));
  return (
    <Container>
      <Categories>
        <Category>
          <ListContainer>
            <Title>뜨거운 맥주들</Title>
            {hotBeerList}
          </ListContainer>
        </Category>
        <Category>
          <ListContainer>
            <Title>차가운 맥주들</Title>
            {hotBeerList}
          </ListContainer>
        </Category>
        <Category>
          <ListContainer>
            <Title>라거</Title>
            {hotBeerList}
          </ListContainer>
        </Category>
      </Categories>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const Categories = styled.ul`
  list-style: none;
`;

const Category = styled.li`
  margin-bottom: 1em;
  margin-right: 3em;
`;

const ListContainer = styled.div``;

const Title = styled.h3`
  color: gold;
  border-bottom: 1px solid gray;
`;

export default WantSomeBeerList;
