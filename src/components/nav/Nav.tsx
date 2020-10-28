import React from 'react';
import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';

import { NavProps } from '../../containers/nav/NavContainer';
import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  lightGrey1,
  lightGrey2,
  btnOff,
  btnOffText,
  pDefault,
} from '../../components/nav/color';

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
  searchbarDisplay,
  handleClickIcon,
  handleSearch,
  pressEnter,
}: NavProps): JSX.Element => {
  return (
    <Container>
      <NavBar className='navBar'>
        <Logo
          src={require('./templogo.jpg')}
          alt='this is fake logo'
          onClick={handleClickLogo}
        />
        <TestBtns>
          <button onClick={testLoginModal}>login modal</button>
        </TestBtns>
        <Wrap className='searchbarWrap'>
          <SearchbarArea className='searchbarArea'>
            <SearchIcon
              className='searchIcon'
              onClick={() => {
                handleClickIcon(!searchbarDisplay);
              }}
            />
            {searchbarDisplay ? (
              <SearchInputWrap className='searchInputWrap'>
                <Input
                  type='text'
                  placeholder='맥주 이름을 입력해주세요.'
                  onChange={handleOnChange}
                  onKeyPress={pressEnter}
                ></Input>
                <SearchBtn onClick={handleSearch}>Biba!</SearchBtn>
              </SearchInputWrap>
            ) : (
              false
            )}
          </SearchbarArea>
          <BtnArea className='btnArea'>
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
            {/* <NicknameProfile>
              {isLogin ? `${userData.nickname}` : ``}
            </NicknameProfile> */}
          </BtnArea>
        </Wrap>
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
  justify-content: space-between;

  width: 100%;
  // border: 2px solid ${mainYellow};
  border-radius: 16px;

  padding: 0.3em 0.7em 0.3em 0.3em;

  color: #fff;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 80%;
`;
const Logo = styled.img`
  cursor: pointer;
  width: 100px;
`;

const SearchbarArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  // width: 26vw;
  height: 3em;
  border-radius: 16px;
  border: 2px solid ${mainYellowOpac};

  margin: 0 0.5em 0.1em 0;
  padding: 0.5em 0.8em 0.5em 0.8em;
  // background-color: ${mainYellowOpac};
`;

const SearchIcon = styled(BiSearchAlt)`
  cursor: pointer;
  display: flex;

  width: 1.5em;
  height: 1.5em;
  color: #545454;
`;
const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; // 박스 내 input, btn

  // width: 22vw;
`;

const Input = styled.input`
  display: flex;

  width: 16vw;
  border: 0px solid ${mainYellow};
  border-radius: 8px;
  margin: 0 0.8em 0 0.6em;
  padding: 0.4em 0.5em 0.3em 0.5em;

  font-size: 0.9em;
  background-color: ${lightGrey1};
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;

  margin: 0 0 0.05em 0;
  padding: 0.4em 0.6em 0.3em 0.6em;

  font-size: 0.95em;
  // font-weight: 300;
  background-color: ${mainYellow};
  color: #fff;

  &:hover {
    background-color: ${mainGrey};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

const BtnArea = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  width: auto;
  height: 3em;
  // border: 1px solid black;
`;

const NavBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;
  background-color: ${mainYellow};
  color: #fff;

  margin: 0 0em 0.1em 0.5em;
  padding: 0.4em 0.7em 0.35em 0.7em;

  font-size: 1.1em;
  font-weight: 300;

  &:hover {
    background-color: ${mainGrey};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

const NicknameProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 0 0 1em;

  color: ${mainGrey};
`;

const TestBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
