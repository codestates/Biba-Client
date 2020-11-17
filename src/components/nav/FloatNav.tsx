import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { FloatNavProps } from '../../containers/nav/FloatNavContainer';
import { AiOutlineHome, AiOutlineInbox } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RiSearch2Line } from 'react-icons/ri';

function FloatNav({
  isLogin,
  handleClickTodayBeer,
  handleClickMobileSearch,
  handleClickMypage,
  handleClickMyBeer,
  display,
  redirectHome,
  handleClickGuest,
  handleClickMobileGuest,
}: FloatNavProps): JSX.Element {
  const isToday = useSelector((state: RootState) => state.changePage.isToday);
  const isSearchM = useSelector(
    (state: RootState) => state.changePage.isSearchM,
  );
  const isMyBeer = useSelector(
    (state: RootState) => state.changePage.isMybeerM,
  );
  const isMyPage = useSelector((state: RootState) => state.changePage.isMy);

  return (
    <FNav className='fnav'>
      <NavBtn
        onClick={() => {
          redirectHome();
          handleClickTodayBeer();
        }}
      >
        {isToday ? <BeerActive /> : <AiOutlineHome />}
      </NavBtn>
      <NavBtn
        onClick={() => {
          handleClickMobileSearch();
          // redirectHome();
        }}
      >
        {isSearchM ? <SearchActive /> : <RiSearch2Line />}
      </NavBtn>
      {isLogin ? (
        <>
          <NavBtn
            onClick={() => {
              redirectHome();
              handleClickMyBeer();
            }}
          >
            {isMyBeer ? <MyBeerActive /> : <AiOutlineInbox />}
          </NavBtn>
          <NavBtn
            onClick={() => {
              redirectHome();
              handleClickMypage();
            }}
          >
            {isMyPage ? <ProfileActive /> : <CgProfile />}
          </NavBtn>
        </>
      ) : (
        <>
          <NavBtn
            onClick={() => {
              handleClickMobileGuest();
            }}
          >
            <AiOutlineInbox />
          </NavBtn>
          <NavBtn
            onClick={() => {
              handleClickMobileGuest();
            }}
          >
            <CgProfile />
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

const BeerActive = styled(AiOutlineHome)`
  color: black;
`;

const SearchActive = styled(RiSearch2Line)`
  color: black;
`;

const MyBeerActive = styled(AiOutlineInbox)`
  color: black;
`;

const ProfileActive = styled(CgProfile)`
  color: black;
`;
export default FloatNav;
