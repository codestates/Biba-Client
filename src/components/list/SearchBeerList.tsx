import React from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import './TodayCss.css';

import { BeerI } from '../../modules/getbeers';
import { DetailProps } from '../../containers/page/HomeContainer';

import SearchBeer from './SearchBeer';
import RequsetBeer from './RequestBeer';

interface SearchBeerProps extends BeerI, DetailProps {}

function SearchBeerList({
  beers,
  setBeerDetail,
  setAllReviews,
}: SearchBeerProps): JSX.Element {
  let sbList;
  if (beers.length !== 0) {
    sbList = beers.map((beer) => (
      <SearchBeer
        key={beer.id}
        name={beer.beer_name}
        image={beer.beer_img}
        rate={beer.rate}
      />
    ));
  } else {
    sbList = <RequsetBeer />;
  }

  const breakpointColumnsObj = {
    default: 5,
    1200: 4,
    1100: 3,
    800: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      {sbList}
    </Masonry>
  );
}

export default SearchBeerList;
