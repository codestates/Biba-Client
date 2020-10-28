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
  redirectLogin,
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
          <TH>Today&apos;s Beer</TH>
        </ListBtn>
        <ListBtn
          onClick={() => {
            redirectHome();
            handleClickWantSomeBeer();
          }}
        >
          <TH>Want Some Beer?</TH>
        </ListBtn>
        {isLogin ? (
          <ListBtn
            onClick={() => {
              redirectHome();
              handleClickMyBeer();
            }}
          >
            <TH>My Beers</TH>
            <SubUl>
              <SubLiBtn
                onClick={() => {
                  redirectHome();
                  handleClickFavorite();
                }}
              >
                <TH>Faviorite</TH>
              </SubLiBtn>
              <SubLiBtn
                onClick={() => {
                  redirectHome();
                  handleClickReview();
                }}
              >
                <TH>Review</TH>
              </SubLiBtn>
            </SubUl>
          </ListBtn>
        ) : (
          <ListBtn
            onClick={() => {
              redirectLogin();
            }}
          >
            <TH>My Beers</TH>
            <SubUl>
              <SubLiBtn>
                <TH>Faviorite</TH>
              </SubLiBtn>
              <SubLiBtn>
                <TH>Review</TH>
              </SubLiBtn>
            </SubUl>
          </ListBtn>
        )}
      </UL>
    </ListNav>
  );
}

const ListNav = styled.div`
  left: 0;
  top: 0;
  margin-top: 2rem;
  padding: 0.5rem;
  border-radius: 10px;
`;

const UL = styled.div`
  list-style: none;
`;

const ListBtn = styled.li`
  font-size: 1rem;
  margin: 2rem;
`;

const TH = styled.div`
  display: inline-block;
  padding: 5px;
  color: #52575d;
  background-color: #f6f4e6;
  border-radius: 10px;
  &:hover {
    color: #fddb3a;
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
`;

export default BeerListNav;
