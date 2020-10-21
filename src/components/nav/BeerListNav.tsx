import React from 'react';
import styled from 'styled-components';

import { BeerListNavProps } from '../../containers/nav/BeerListNavContainer';

function BeerListNav({
  isLogin,
  handleClickTodayBeer,
  handleClickWantSomeBeer,
  handleClickMyBeer,
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
        </ListBtn>
      </UL>
    </ListNav>
  );
}

const ListNav = styled.div`
  // width: 14vw;
  // height: 100vh;
  left: 0;
  top: 0;
  padding: 1rem;
  border: 1px solid black;
`;

const UL = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  list-gap: 30px;
`;

const ListBtn = styled.li`
  font-size: 1rem;
  color: gold;
  margin: 1rem;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

export default BeerListNav;
