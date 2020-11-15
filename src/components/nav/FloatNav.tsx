import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { BeerListNavProps } from '../../containers/nav/BeerListNavContainer';
import { BiBeer } from 'react-icons/bi';
import { MdFavorite, MdRateReview } from 'react-icons/md';
import { IoMdList } from 'react-icons/io';

function FloatNav({
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
  );
}
const FNav = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 9vh;
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
export default FloatNav;
