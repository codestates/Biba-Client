import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import './TodayCss.css';
import { AiFillCaretDown } from 'react-icons/ai';

import FavoriteBeer from './FavoriteBeer';
import { FavorI } from '../../modules/getbeers';
import { DetailProps } from '../../containers/page/HomeContainer';
import { mainYellow2 } from '../nav/color';

interface FavoriteBeerProps extends FavorI, DetailProps {}

function FavoriteBeerList({
  abcBeers,
  recentBeers,
  setBeerDetail,
  setAllReviews,
}: FavoriteBeerProps): JSX.Element {
  const [isAbc, setIsAbc] = useState(true);
  const abcBeerList = abcBeers.map((beer) => (
    <FavoriteBeer
      id={beer.id}
      key={beer.id}
      name={beer.beer_name}
      image={beer.beer_img}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  ));
  const recentBeerList = recentBeers.map((beer) => (
    <FavoriteBeer
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
    1200: 4,
    1100: 3,
    800: 2,
    500: 1,
  };
  return (
    <>
      <TitleWrap>
        <Title>즐겨찾는 맥주들</Title>
        {isAbc ? (
          <FilterBox>
            {' '}
            <Filter
              onClick={() => {
                setIsAbc(false);
              }}
            >
              최신순
              <Tri />
            </Filter>
            <FilterActive>
              가나다순
              <Tri />
            </FilterActive>
          </FilterBox>
        ) : (
          <FilterBox>
            <FilterActive>
              최신순
              <Tri />
            </FilterActive>
            <Filter
              onClick={() => {
                setIsAbc(true);
              }}
            >
              가나다순
              <Tri />
            </Filter>
          </FilterBox>
        )}
      </TitleWrap>
      <ContentWrap>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {isAbc ? abcBeerList : recentBeerList}
        </Masonry>
      </ContentWrap>
    </>
  );
}
const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: fit-content;
`;

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

const Title = styled.h3`
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
  background-color: ${mainYellow2};
  opacity: 0.9;
  color: white;
`;

const FilterBox = styled.div`
  margin-top: 40px;
`;

const Filter = styled.div`
  float: left;
  padding-left: 5px;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

const FilterActive = styled.div`
  float: left;
  padding-left: 5px;
  font-weight: bold;
  color: ${mainYellow2};
`;

const Tri = styled(AiFillCaretDown)`
  padding-top: 4px;
`;
export default FavoriteBeerList;
