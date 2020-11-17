import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import { DetailProps } from '../../containers/page/HomeContainer';
import { BeerT } from '../../modules/getbeers';
import FavoriteBeer from '../list/FavoriteBeer';
import Review from '../list/ReviewBeer';
import { mainYellow2 } from '../nav/color';

interface MyBeerProps extends DetailProps {
  abcBeers: BeerT[];
  reviewBeers: BeerT[];
}

function MobileMyBeer({
  abcBeers,
  reviewBeers,
  setBeerDetail,
  setAllReviews,
}: MyBeerProps): JSX.Element {
  const [isFavor, setIsFavor] = useState(true);
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
  const reviewBeerList = reviewBeers.map((beer) => (
    <Review
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
    default: 2,
    768: 3,
    414: 2,
  };

  return (
    <Container>
      <MyBeerNav>
        {isFavor ? (
          <>
            <ActiveBtn
              onClick={() => {
                setIsFavor(true);
              }}
            >
              <Span>즐겨찾는 맥주</Span>
            </ActiveBtn>
            <Btn
              onClick={() => {
                setIsFavor(false);
              }}
            >
              리뷰 쓴 맥주
            </Btn>
          </>
        ) : (
          <>
            <Btn
              onClick={() => {
                setIsFavor(true);
              }}
            >
              즐겨찾는 맥주
            </Btn>
            <ActiveBtn
              onClick={() => {
                setIsFavor(false);
              }}
            >
              <Span>리뷰 쓴 맥주</Span>
            </ActiveBtn>
          </>
        )}
      </MyBeerNav>
      <BeerList>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {isFavor ? abcBeerList : reviewBeerList}
        </Masonry>
      </BeerList>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MyBeerNav = styled.div`
  display: flex;
  justify-content: center;
`;

const Btn = styled.div`
  padding: 20px;

  @media (max-width: 425px) {
    padding: 10px;
  }
`;

const ActiveBtn = styled.div`
  padding: 20px;
  color: ${mainYellow2};
  transition: 2s;

  @media (max-width: 425px) {
    padding: 10px;
  }
`;

const Span = styled.span`
  &:after {
    content: '';
    display: block;
    width: 60%;
    border-bottom: 3px solid ${mainYellow2};
    margin: 0 auto;

    animation: fadein 3s;

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const BeerList = styled.div``;

export default MobileMyBeer;
