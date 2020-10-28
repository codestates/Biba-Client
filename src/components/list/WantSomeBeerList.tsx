import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import './WantCss.css';

import WantSomeBeer from './WantSomeBeer';
import { WantI } from '../../modules/getbeers';
import { DetailProps } from '../../containers/page/HomeContainer';

interface WSLBeerProps extends WantI, DetailProps {}

function WantSomeBeerList({
  hotBeers,
  lateBeers,
  pickBeers,
  setBeerDetail,
  setAllReviews,
}: WSLBeerProps): JSX.Element {
  const hotBeerList = hotBeers.map((beer) => (
    <WantSomeBeer
      id={beer.id}
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
      id={beer.id}
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  ));

  // const pickBeerList = pickBeers.map((beer) => (
  //   <WantSomeBeer
  //     key={beer.id}
  //     name={beer.beer_name}
  //     image={beer.beer_img}
  //     rate={beer.rate}
  //     setBeerDetail={setBeerDetail}
  //     setAllReviews={setAllReviews}
  //   />
  // ));
  const breakPoint = [{ width: 1200, itemsToShow: 5 }];

  return (
    <Container>
      <Categories>
        <Title>뜨거운 맥주들</Title>
        <Category>
          <ListContainer>
            <UlHot>
              <Li>{hotBeerList}</Li>
            </UlHot>
          </ListContainer>
        </Category>
        <Title>최신 맥주들</Title>
        <Category>
          <ListContainer>
            <UlLate>
              <Carousel
                className='slider button.rec-dot button.rec-arrow'
                breakPoints={breakPoint}
              >
                {lateBeerList}
              </Carousel>
            </UlLate>
          </ListContainer>
        </Category>
        <Title>즐겨찾는 맥주들</Title>
        <Category>
          <ListContainer>
            <UlGer>
              <Li></Li>
            </UlGer>
          </ListContainer>
        </Category>
      </Categories>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const Categories = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Category = styled.li`
  margin-bottom: 1em;
`;

const ListContainer = styled.div`
  width: 100%;
  position: relative;
`;

const UlHot = styled.ul`
  padding: 0;
  transform: translate3d(0%, 0, 0);
`;
const UlLate = styled.ul``;
const UlGer = styled.ul`
  padding: 0;
  transform: translate3d(0%, 0, 0);
`;

const Li = styled.li`
  display: inline-block;
  vertical-align: top;
`;

const Title = styled.h3`
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
  background-color: #f2a405;
  opacity: 0.9;
  color: white;
`;

export default WantSomeBeerList;
