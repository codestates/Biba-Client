import React from 'react';
import styled from 'styled-components';

import { NavProps } from '../../containers/nav/Nav';

export const Nav = ({
  userData,
  isLogin,
  iconDisplay,
  barDisplay,
  logout,
  handleClickLogo,
  handleClickLogin,
  handleClickLogout,
  handleClickSignup,
  handleClickMypage,
}: NavProps): JSX.Element => {
  return (
    <Container>
      <NavBar className='navBar'>
        <Logo
          src='fakeLogo.jpg'
          alt='this is fake logo'
          onClick={() => {
            console.log('link to /');
            return handleClickLogo();
          }}
        />
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
          <div>
            {isLogin
              ? `${userData.username}님이 로그인하셨습니다.`
              : `로그인해주세요.`}
            &nbsp; &nbsp;
          </div>
          <NavBtn
            onClick={() => {
              isLogin ? handleClickMypage() : handleClickSignup();
            }}
          >
            {isLogin ? `마이페이지` : `회원가입`}
          </NavBtn>
          <NavBtn
            onClick={() => {
              isLogin ? logout() : handleClickLogin();
            }}
          >
            {isLogin ? `로그아웃` : `로그인`}
          </NavBtn>
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
