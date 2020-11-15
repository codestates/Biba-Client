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
import { BiBeer } from 'react-icons/bi';
import { MdFavorite, MdRateReview } from 'react-icons/md';
import { IoMdList } from 'react-icons/io';

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
  const isToday = useSelector((state: RootState) => state.changePage.isToday);
  const isWant = useSelector((state: RootState) => state.changePage.isWant);
  const isFavorite = useSelector(
    (state: RootState) => state.changePage.isFavorite,
  );
  const isReview = useSelector((state: RootState) => state.changePage.isReview);

  return (
    <>
      <ListNav style={display ? {} : { display: 'none' }}>
        <UL>
          <ListBtn
            onClick={() => {
              redirectHome();
              handleClickTodayBeer();
            }}
          >
            <TH>
              {isToday ? (
                <SubSpanActive>Today&apos;s Beer</SubSpanActive>
              ) : (
                <Span>Today&apos;s Beer</Span>
              )}
            </TH>
          </ListBtn>
          <ListBtn
            onClick={() => {
              redirectHome();
              handleClickWantSomeBeer();
            }}
          >
            <TH>
              {isWant ? (
                <SubSpanActive>Want Some Beer?</SubSpanActive>
              ) : (
                <Span>Want Some Beer?</Span>
              )}
            </TH>
          </ListBtn>
          {isLogin ? (
            <ListBtn>
              <RedirectBtn
                onClick={() => {
                  redirectHome();
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
                    redirectHome();
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
                    redirectHome();
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
      <FNav className='fnav'>
        <NavBtn
          onClick={() => {
            redirectHome();
            handleClickTodayBeer();
          }}
        >
          {isToday ? <BeerActive /> : <BiBeer />}
        </NavBtn>
        <NavBtn
          onClick={() => {
            redirectHome();
            handleClickWantSomeBeer();
          }}
        >
          {isWant ? <WantActive /> : <IoMdList />}
        </NavBtn>
        {isLogin ? (
          <>
            <NavBtn
              onClick={() => {
                redirectHome();
                handleClickFavorite();
              }}
            >
              {isFavorite ? <FavoriteActive /> : <MdFavorite />}
            </NavBtn>
            <NavBtn
              onClick={() => {
                redirectHome();
                handleClickReview();
              }}
            >
              {isReview ? <ReviewActive /> : <MdRateReview />}
            </NavBtn>
          </>
        ) : (
          <>
            <NavBtn
              onClick={() => {
                handleClickGuest();
              }}
            >
              <MdFavorite />
            </NavBtn>
            <NavBtn
              onClick={() => {
                handleClickGuest();
              }}
            >
              <MdRateReview />
            </NavBtn>
          </>
        )}
      </FNav>
    </>
  );
}

const ListNav = styled.div`
  font-family: 'Lato';
  left: 0;
  top: 0;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const UL = styled.div`
  list-style: none;
  padding: 0.3rem 0 0 0;

  @media (max-width: 768px) {
    display: none;
  } ;
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
  color: ${mainYellow};
`;

const SubUl = styled.ul`
  list-style: none;
  transform: translateX(-20%);
  margin: 0.5rem 0 0 1.38rem;
`;

const SubLiBtn = styled.li`
  margin: 0;
`;

const FNav = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    algin-items: center;
    padding: 0;
  } ;
`;

const NavBtn = styled.div`
  font-size: 1.8em;
  color: rgba(50, 50, 50, 0.5);
`;

const BeerActive = styled(BiBeer)`
  color: black;
`;

const WantActive = styled(IoMdList)`
  color: black;
`;

const FavoriteActive = styled(MdFavorite)`
  color: black;
`;

const ReviewActive = styled(MdRateReview)`
  color: black;
`;
export default BeerListNav;
