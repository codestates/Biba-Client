import React from 'react';
import styled from 'styled-components';

import WantSomeBeer from './WantSomeBeer';
import { WantI } from '../../modules/getbeers';

interface WSLBeerProps extends WantI {
  setBeerDetail(e: React.MouseEvent<HTMLElement>): void;
  setAllReviews(e: React.MouseEvent<HTMLElement>): void;
}
function WantSomeBeerList({
  hotBeers,
  lateBeers,
  pickBeers,
  setBeerDetail,
  setAllReviews,
}: WSLBeerProps): JSX.Element {
  const hotBeerList = hotBeers.map((beer) => (
    <WantSomeBeer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  ));
  const lateBeerList = lateBeers.map((beer) => (
    <WantSomeBeer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  ));
  const pickBeerList = pickBeers.map((beer) => (
    <WantSomeBeer
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
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
            <Title>최신 맥주들</Title>
            {lateBeerList}
          </ListContainer>
        </Category>
        <Category>
          <ListContainer>
            <Title>즐겨찾는 맥주들</Title>
            {pickBeerList}
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
