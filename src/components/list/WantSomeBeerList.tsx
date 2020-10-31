import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import './WantCss.css';

import WantSomeBeer from './WantSomeBeer';
import { WantI } from '../../modules/getbeers';
import { DetailProps } from '../../containers/page/HomeContainer';

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
  const breakPoint = [{ width: 1200, itemsToShow: 5 }];
  recommendBeers = [];

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
              <Name>{nickname}</Name>님을 위한 취향저격 맥주들
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
  overflow-y: scroll;

  animation: fadein 3s;
  -moz-animation: fadein 3s; /* Firefox */
  -webkit-animation: fadein 3s; /* Safari and Chrome */
  -o-animation: fadein 3s; /* Opera */

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
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
  // border: 1px solid #f2a405;
  // border-radius: 8px;
  box-shadow: 1px 1px 1px;
  height: 265px;
  width: 100%;
`;

const Hidden = styled.div`
  text-align: center;
  font-size: 2em;
  padding: 3em 0 3em 0;
`;

const Highlight = styled.span`
  padding: 2px;
  border-radius: 8px;
  background-color: #f2a405;
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
  background-color: #f2a405;
  opacity: 0.9;
  color: white;
`;

const Name = styled.span`
  color: black;
`;

export default WantSomeBeerList;
