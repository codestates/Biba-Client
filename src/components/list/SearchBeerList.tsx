import React from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import '../../css/TodayCss.css';
import { BeerListProps } from '../../containers/page/HomeContainer';

import SearchBeer from './SearchBeer';
import RequsetBeer from './RequestBeer';

function SearchBeerList({
  beers,
  setBeerDetail,
  setAllReviews,
}: BeerListProps): JSX.Element {
  let sbList;
  let exist = false;
  if (beers.length !== 0) {
    exist = true;
    sbList = beers.map((beer) => (
      <SearchBeer
        id={beer.id}
        key={beer.id}
        name={beer.beer_name}
        image={beer.beer_img}
        rate={beer.rate}
        setBeerDetail={setBeerDetail}
        setAllReviews={setAllReviews}
      />
    ));
  } else {
    sbList = <RequsetBeer />;
  }

  const breakpointColumnsObj = {
    default: 5,
    1200: 4,
    1100: 3,
    768: 3,
    425: 2,
  };

  return (
    <>
      {exist ? (
        <ContentWrap>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'
          >
            {sbList}
          </Masonry>
        </ContentWrap>
      ) : (
        <Container>{sbList}</Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 500px;
`;

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
`;

export default SearchBeerList;
