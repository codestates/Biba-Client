import React from 'react';
import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';

import { NavProps } from '../../containers/nav/Nav';

export const Nav = ({
  userData,
  isLogin,
  logout,
  handleClickLogo,
  handleClickLogin,
  handleClickSignup,
  handleClickMypage,
  testLoginModal,
  handleOnChange,
  handleSearch,
  pressEnter,
  testDetail,
}: NavProps): JSX.Element => {
  return (
    <Container>
      <NavBar className='navBar'>
        <Logo
          src='fakeLogo.jpg'
          alt='this is fake logo'
          onClick={handleClickLogo}
        />
        <SearchBarArea className='searchBarArea'>
          <button onClick={testLoginModal}>login modal</button>
          <button
            onClick={() => {
              testDetail();
            }}
          >
            detail
          </button>
          <Wrap>
            <SearchIcon className='searchIcon' />
            {isLogin ? (
              <>
                <Input
                  type='text'
                  onChange={handleOnChange}
                  onKeyPress={pressEnter}
                ></Input>
                <SearchBtn onClick={handleSearch}>검색</SearchBtn>
              </>
            ) : (
              false
            )}
          </Wrap>
        </SearchBarArea>
        <BtnArea className='btnArea'>
          <div>
            {isLogin
              ? `${userData.nickname}님이 로그인하셨습니다.`
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

  justify-content: flex-end;
  align-items: center;

  width: 30em;
  height: 3em;
  border: 1px solid black;
`;
const Wrap = styled.div`
  display: flex;

  align-items: center;

  padding: 0.5em;
  background-color: lightgrey;
`;

const SearchIcon = styled(BiSearchAlt)`
  display: flex;

  width: 1.5em;
  height: 1.5em;
  color: #545454;
`;

const Input = styled.input`
  display: flex;
  margin: 0 0.5em 0 0.5em;
`;

const SearchBtn = styled.button`
  cursor: pointer;
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
  cursor: pointer;
  margin: 0 0.3em 0 0;
`;
