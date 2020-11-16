import React from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import '../../css/TodayCss.css';
import TodayBeer from './TodayBeer';
import { BeerListProps } from '../../containers/page/HomeContainer';

function TodayBeerList({
  beers,
  setBeerDetail,
  setAllReviews,
}: BeerListProps): JSX.Element {
  const todayBeerList = beers.map((beer) => (
    <TodayBeer
      id={beer.id}
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  ));

  const breakpointColumnsObj = {
    default: 5,
    1660: 4,
    1310: 3,
    1025: 2,
  };

  return (
    <ContentWrap>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {todayBeerList}
      </Masonry>
    </ContentWrap>
  );
}

const ContentWrap = styled.div`
  animation: fadein 3s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export default TodayBeerList;
