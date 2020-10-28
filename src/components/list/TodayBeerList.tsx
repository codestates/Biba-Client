import React from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import './TodayCss.css';

import TodayBeer from './TodayBeer';
import { BeerT } from '../../modules/getbeers';
import { BeerListProps } from '../../containers/page/HomeContainer';

function TodayBeerList({
  beers,
  setBeerDetail,
  setAllReviews,
}: BeerListProps): JSX.Element {
  if (beers.length !== 0) {
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
  }
  const breakpointColumnsObj = {
    default: 5,
    1200: 4,
    1100: 3,
    800: 2,
    500: 1,
  };

  const images = [
    'https://i.pinimg.com/originals/d0/ea/d2/d0ead2e7dcbb21d573ad284cc1f80393.jpg',
    'https://i.pinimg.com/564x/75/75/92/757592c44f0cf79fb9e76406f76116b7.jpg',
    'https://i.pinimg.com/564x/18/19/16/181916a67a22135c6d2d36bcefce5bc0.jpg',
    'https://i.pinimg.com/564x/93/66/0a/93660a428bbeabdf13adeffcaed854fd.jpg',
    'https://i.pinimg.com/564x/6b/7e/f3/6b7ef33691e8168fe754aec118303976.jpg',
    'https://i.pinimg.com/474x/d2/8b/48/d28b48f6fd07f06b5bf8f39ba21e90df.jpg',
    'https://i.pinimg.com/564x/b7/ac/88/b7ac88ac08cff7b2afffe463fd796352.jpg',
    'https://i.pinimg.com/564x/aa/84/85/aa8485948914702b39c8d74fce80a41d.jpg',
    'https://i.pinimg.com/474x/87/06/16/870616e8b15abb5c0690bdabc52e0d06.jpg',
    'https://i.pinimg.com/564x/3e/28/b6/3e28b60219564d7e3bcc7ee0af027c10.jpg',
    'https://i.pinimg.com/474x/b9/a1/b5/b9a1b5134360f8bba449f8f7396f902f.jpg',
    'https://i.pinimg.com/474x/7d/ed/e5/7dede5332ad7fafeea1da41cb582d9a8.jpg',
    'http://pds18.egloos.com/pds/201007/23/44/e0080644_4c49804cb9d78.jpg',
  ];
  const todayBeerList = images.map((url, index) => (
    <Item key={index} src={url} />
  ));

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      {todayBeerList}
    </Masonry>
  );
}

const Item = styled.img`
  width: 200px;
  border-radius: 10px;
  box-shadow: 3px 3px lightgray;
  margin-bottom: 10px;
  &:hover {
    transition: all ease 1s;
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export default TodayBeerList;
