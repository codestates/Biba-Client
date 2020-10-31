import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
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

  handleClickFavorite,
  handleClickReview,
  display,
  redirectHome,
  redirectLogin,
  handleClickGuest,
}: BeerListNavProps): JSX.Element {
  const isFavorite = useSelector(
    (state: RootState) => state.changePage.isFavorite,
  );
  const isReview = useSelector((state: RootState) => state.changePage.isReview);

  return (
    <ListNav style={display ? {} : { display: 'none' }}>
      <UL>
        <ListBtn
          onClick={() => {
            redirectHome();
            handleClickTodayBeer();
          }}
        >
          <TH>
            <Span>Today&apos;s Beer</Span>
          </TH>
        </ListBtn>
        <ListBtn
          onClick={() => {
            redirectHome();
            handleClickWantSomeBeer();
          }}
        >
          <TH>
            <Span>Want Some Beer?</Span>
          </TH>
        </ListBtn>
        {isLogin ? (
          <ListBtn>
            <RedirectBtn
              onClick={() => {
                handleClickFavorite();
              }}
            >
              <TH>
                <Span>My Beers</Span>
              </TH>
            </RedirectBtn>
            <SubUl>
              <SubLiBtn
                onClick={() => {
                  handleClickFavorite();
                }}
              >
                {isFavorite ? (
                  <TH>
                    <SubSpanActive>Faviorite</SubSpanActive>
                  </TH>
                ) : (
                  <TH>Faviorite</TH>
                )}
              </SubLiBtn>
              <SubLiBtn
                onClick={() => {
                  handleClickReview();
                }}
              >
                {isReview ? (
                  <TH>
                    <SubSpanActive>Review</SubSpanActive>
                  </TH>
                ) : (
                  <TH>Review</TH>
                )}
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
  margin-top: 1rem;
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
  padding: 5px;
  color: ${mainGrey};
  font-size: 1.25rem;

  &:hover {
    color: ${mainYellow};
    cursor: pointer;
  }
`;

const RedirectBtn = styled.div``;

const Span = styled.span`
  border-bottom: 2px solid transparent;
  transition: border-bottom 1s;
  text-decoration: none;

  &:hover {
    border-bottom: 2px solid ${mainYellow};
  }
`;

const SubSpanActive = styled.span`
  padding: 2px;
  border-radius: 8px;
  background-color: #f2a405;
  opacity: 0.9;
  color: white;
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
