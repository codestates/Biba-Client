import React from 'react';
import styled from 'styled-components';

import { BeerListNavProps } from '../../containers/nav/BeerListNavContainer';
import {
  mainGrey,
  mainGreyOpac,
  mainYellow,
  lightGrey1,
  lightGrey2,
} from '../../components/nav/color';

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
  handleClickGuest,
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
              handleClickGuest();
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
  font-family: 'Lato';
  left: 0;
  top: 0;
  margin-top: 2rem;
  padding: 0.5rem;
  border-radius: 10px;
`;

const UL = styled.div`
  list-style: none;
  padding: 0.3rem 0 0 0;
`;

const ListBtn = styled.li`
  margin: 0rem 2rem 1.25rem 1rem;
`;

const TH = styled.div`
  display: inline-block;
  padding: 5px;
  color: ${mainGrey};
  font-size: 1.25rem;
  &:hover {
    color: ${mainYellow};
    cursor: pointer;
  }
`;

const SubUl = styled.ul`
  list-style: none;
  transform: translateX(-20%);
  margin: 0.5rem 0 0 1.38rem;
`;

const SubLiBtn = styled.li`
  margin: 0;
`;

export default BeerListNav;
