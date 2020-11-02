import React from 'react';
import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';
import { GiClick } from 'react-icons/gi';

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
import { PIcon } from '../../containers/nav/ModalContainer';

export const Nav = ({
  userData,
  isLogin,
  profile,
  inputQuery,
  handleClickLogo,
  handleClickLogin,
  handleClickLogout,
  handleClickSignup,
  handleClickMypage,
  handleOnChange,
  searchbarDisplay,
  handleClickIcon,
  handleSearch,
  pressEnter,
}: NavProps): JSX.Element => {
  return (
    <Container>
      <NavBar className='navBar'>
        <LogoWrap>
          <Logo
            src='https://biba-beer-png1.s3.amazonaws.com/IMG_8331.JPG'
            alt='biba logo'
            onClick={handleClickLogo}
          />
        </LogoWrap>

        <Wrap className='searchbarWrap'>
          <SearchbarArea className='searchbarArea'>
            {isLogin ? (
              <>
                <SearchIcon
                  className='searchIcon'
                  style={{ cursor: 'default', width: '1.5em' }}
                />
                <SearchInputWrap className='searchInputWrap'>
                  <Input
                    type='text'
                    placeholder='맥주 이름을 입력해주세요.'
                    value={inputQuery.query}
                    onChange={handleOnChange}
                    onKeyPress={pressEnter}
                  ></Input>
                  <SearchBtn onClick={handleSearch}>Biba!</SearchBtn>
                </SearchInputWrap>
              </>
            ) : (
              <>
                <IconWrap>
                  <SearchIcon
                    className='searchIcon'
                    onClick={() => {
                      handleClickIcon(!searchbarDisplay);
                    }}
                  />
                  <ClickHere
                    style={searchbarDisplay ? { opacity: 0 } : { opacity: 1 }}
                  />
                </IconWrap>
                {searchbarDisplay ? (
                  <SearchInputWrap className='searchInputWrap'>
                    <Input
                      type='text'
                      placeholder='맥주 이름을 입력해주세요.'
                      value={inputQuery.query}
                      onChange={handleOnChange}
                      onKeyPress={pressEnter}
                    ></Input>
                    <SearchBtn onClick={handleSearch}>Biba!</SearchBtn>
                  </SearchInputWrap>
                ) : (
                  false
                )}
              </>
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
                isLogin ? handleClickLogout() : handleClickLogin();
              }}
            >
              {isLogin ? `로그아웃` : `로그인`}
            </NavBtn>
            {isLogin ? (
              <NicknameProfile>
                {profile === '' || profile === undefined ? (
                  <NavPIcon />
                ) : (
                  <SmallProfile src={profile} />
                )}
              </NicknameProfile>
            ) : undefined}
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
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  border-radius: 50%;
  overflow: hidden;
  margin: 0 0 0 1.5em;
`;
const Logo = styled.img`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  object-fit: contain;
  // margin: 0 -0.5em 0 -0.5em;
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

const IconWrap = styled.div`
  display: flex;
  flex-direcion: column;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 1.5em;
  heigth: 30em;
  overflow-x: visible;
  left: -60px;
  margin: 2em 0 0 0;
`;
const ClickHere = styled(GiClick)`
  display: flex;
  position: relative;
  width: 1.9em;
  height: 1.9em;
  color: rgba(91, 27, 240, 0.9);
  margin: -5px -30px 5px 6px;

  animation: blinkingText 1.2s infinite;
  @keyframes blinkingText {
    0% {
    }
    40% {
      color: transparent;
    }
    50% {
      color: transparent;
    }
    100% {
    }
  }
`;

const SearchIcon = styled(BiSearchAlt)`
  cursor: pointer;
  display: flex;
  z-index: 1;

  width: 3em;
  height: 1.5em;
  color: #545454;
`;
const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; // 박스 내 input, btn
  overflow: hidden;
  animation: strecth 2s cubic-bezier(0.74, 0.09, 0.2, 0.92) forwards;

  @keyframes strecth {
    0% {
      margin-left: 100%;
    }
  }
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

  width: 45px;
  height: 45px;
  // border: 2px solid ${mainYellow};
  border-radius: 50%;
  overflow: hidden;
  margin: 0 0 0.2em 1em;
`;
const NavPIcon = styled(PIcon)`
  width: 35px;
  height: 35px;
  margin: 0 0 0.2em -0.5em;
  padding: 0;
`;
const SmallProfile = styled.img`
  height: 150%;
  width: 150%;
  // max-height: 100vh;
  // max-width: 100vh;
  object-fit: contain;
`;
