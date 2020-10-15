import React from 'react';
import { NavProps } from '../../containers/Nav';

import styled from 'styled-components';

export const Nav = ({
  isSignin,
  userData,
  setSignin,
  iconDisplay,
  barDisplay,
  setSearchBar,
}: NavProps): JSX.Element => {
  const syncBtns = (): void => {
    isSignin
      ? setSignin({ id: 0, username: '' }, false, '')
      : setSignin({ id: 100, username: 'USER1' }, true, 'test token');
    isSignin ? setSearchBar(true, false) : setSearchBar(false, true);
  };
  return (
    <Container>
      <NavBar className='navBar' onClick={() => console.log('link to home')}>
        <Logo src='fakeLogo.jpg' alt='this is fake logo' />
        <SearchBarArea className='searchBarArea'>
          <div>
            iconDisplay
            <Input
              type='checkbox'
              id='iconDisplay'
              checked={iconDisplay}
              onChange={() => console.log('iconDisplay')}
            ></Input>
          </div>
          <div>
            barDisplay
            <Input
              type='checkbox'
              id='barDisplay'
              checked={barDisplay}
              onChange={() => console.log('barDisplay')}
            ></Input>
          </div>
        </SearchBarArea>
        <BtnArea className='btnArea'>
          <div>{`${
            isSignin ? userData.username : `stranger`
          }님이 로그인하셨습니다.`}</div>
          <div>
            &nbsp; test
            <Input
              type='checkbox'
              id='isSignin'
              checked={isSignin}
              onClick={syncBtns}
              onChange={() => console.log('isSignin')}
            ></Input>
          </div>
          <NavBtn>{isSignin ? `회원가입` : `마이페이지`}</NavBtn>
          <NavBtn>{isSignin ? `로그아웃` : `로그인`}</NavBtn>
        </BtnArea>
      </NavBar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const NavBar = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;

  border: 2px solid #545454;

  width: 65em;
  margin: 2em;
  padding: 0.3em;
`;

const Logo = styled.img`
  width: 100px;
`;

const SearchBarArea = styled.div`
  display: flex;
  align-self: center;

  justify-content: center;
  align-items: center;

  width: 30em;
  height: 3em;
  border: 1px solid black;
`;

const BtnArea = styled.div`
  display: flex;
  align-self: center;

  justify-content: flex-end;
  align-items: center;

  width: 35vw;
  height: 3em;
  border: 1px solid black;
`;

const NavBtn = styled.button`
  margin: 0 0.3em 0 0;
`;

const Input = styled.input`
  margin: 0 0.5em 0 0.5em;
`;
