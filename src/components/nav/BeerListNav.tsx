import React from 'react';
import styled from 'styled-components';

import { BeerListNavProps } from '../../containers/nav/BeerListNavContainer';

function BeerListNav({
  isLogin,
  handleClickTodayBeer,
  handleClickWantSomeBeer,
  handleClickMyBeer,
  handleClickFavorite,
  handleClickReview,
  display,
  redirectHome,
}: BeerListNavProps): JSX.Element {
  return (
    <ListNav style={display ? {} : { display: 'none' }}>
      <UL>
        <ListBtn
          onClick={() => {
            redirectHome();
            handleClickTodayBeer();
          }}
        >
          Today&apos;s Beer
        </ListBtn>
        <ListBtn
          onClick={() => {
            redirectHome();
            handleClickWantSomeBeer();
          }}
        >
          Want Some Beer?
        </ListBtn>
        <ListBtn
          onClick={() => {
            redirectHome();
            handleClickMyBeer();
          }}
        >
          My Beers
          <SubUl>
            <SubLiBtn
              onClick={() => {
                redirectHome();
                handleClickFavorite();
              }}
            >
              Faviorite
            </SubLiBtn>
            <SubLiBtn
              onClick={() => {
                redirectHome();
                handleClickReview();
              }}
            >
              Review
            </SubLiBtn>
          </SubUl>
        </ListBtn>
      </UL>
    </ListNav>
  );
}

const ListNav = styled.div`
  // width: 14vw;
  height: 100vh;
  left: 0;
  top: 0;
  padding: 1rem;
  border: 1px solid black;
`;

const UL = styled.div`
  list-style: none;
`;

const ListBtn = styled.li`
  font-size: 1rem;
  color: gold;
  margin: 2rem;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

const SubUl = styled.ul`
  list-style: none;
  transform: translateX(-20%);
`;

const SubLiBtn = styled.li`
  font-size: 1rem;
  color: gold;
  margin: 0.5rem;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

export default BeerListNav;
