import React from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import './TodayCss.css';
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
export default TodayBeerList;
