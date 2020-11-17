import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import '../../css/WantCss.css';
import WantSomeBeer from './WantSomeBeer';
import { WantI } from '../../modules/getbeers';
import { DetailProps } from '../../containers/page/HomeContainer';
import { mainGrey, mainYellow2 } from '../nav/color';

interface WSLBeerProps extends WantI, DetailProps {
  nickname: string;
  isLogin: boolean;
}

function WantSomeBeerList({
  isLogin,
  nickname,
  hotBeers,
  lateBeers,
  wheatBeers,
  germanBeers,
  recommendBeers,
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
  const wheatBeerList = wheatBeers.map((beer) => (
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
  const germanBeerList = germanBeers.map((beer) => (
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
  const recommendBeerList = recommendBeers.map((beer) => (
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
  const breakPoint = [
    { width: 768, itemsToShow: 2 },
    { width: 425, itemsToShow: 3 },
    { width: 375, itemsToShow: 4 },
  ];

  return (
    <Container>
      <Categories>
        <Category>
          <Title>뜨거운 맥주들</Title>
          <ListContainer>
            <Ul>
              <Carousel
                className='button.rec-dot button.rec-arrow'
                breakPoints={breakPoint}
              >
                {hotBeerList}
              </Carousel>
            </Ul>
          </ListContainer>
        </Category>

        {isLogin ? (
          <Category>
            <Title>
              <Name>{nickname}</Name>님의 취저 맥주들
            </Title>
            <ListContainer>
              {recommendBeers.length === 0 ? (
                <Hidden>
                  좋아하는 맥주에 별점을 주시면 <Highlight>취저맥주</Highlight>{' '}
                  추천드릴게요!
                </Hidden>
              ) : (
                <Ul>
                  <Carousel
                    className='button.rec-dot button.rec-arrow'
                    breakPoints={breakPoint}
                  >
                    {recommendBeerList}
                  </Carousel>
                </Ul>
              )}
            </ListContainer>
          </Category>
        ) : (
          false
        )}

        <Category>
          <Title>최신 맥주들</Title>
          <ListContainer>
            <Ul>
              <Carousel
                className='button.rec-dot button.rec-arrow'
                breakPoints={breakPoint}
              >
                {lateBeerList}
              </Carousel>
            </Ul>
          </ListContainer>
        </Category>

        <Category>
          <Title>밀 맥주들</Title>
          <ListContainer>
            <Ul>
              <Carousel
                className='button.rec-dot button.rec-arrow'
                breakPoints={breakPoint}
              >
                {wheatBeerList}
              </Carousel>
            </Ul>
          </ListContainer>
        </Category>

        <Category>
          <Title>독일 맥주들</Title>
          <ListContainer>
            <Ul>
              <Carousel
                className='button.rec-dot button.rec-arrow'
                breakPoints={breakPoint}
              >
                {germanBeerList}
              </Carousel>
            </Ul>
          </ListContainer>
        </Category>
      </Categories>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;

  animation: fadein 3s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
  // border: 1px solid ${mainYellow2};
  // border-radius: 8px;
  height: 265px;
  width: 100%;
`;

const Hidden = styled.div`
  text-align: center;
  font-size: 2em;
  padding: 3em 0 3em 0;
  color: ${mainGrey};

  @media (max-width: 768px) {
    font-size: 1.8em;
  }

  @media (max-width: 425px) {
    font-size: 1.6em;
  }

  @media (max-width: 360px) {
    font-size: 1.5em;
  }
`;

const Highlight = styled.span`
  padding: 2px;
  border-radius: 8px;
  background-color: ${mainYellow2};
  opacity: 0.9;
  color: white;
`;

const Ul = styled.ul`
  margin: 0 auto;
  padding: 10px;
  padding-top: 20px;
  margin-left: 5px;
`;

const Li = styled.li`
  display: inline-block;
  vertical-align: top;
`;

const Title = styled.h3`
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
  background-color: ${mainYellow2};
  opacity: 0.9;
  color: white;
`;

const Name = styled.span`
  color: black;
  letter-spacing: 2px;
`;

export default WantSomeBeerList;
