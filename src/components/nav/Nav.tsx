import React from 'react';
import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';
import { GiClick } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import { BiBeer } from 'react-icons/bi';

import { LoginContainerWithRouter } from '../../containers/user/LoginContainer';
import { FooterContainerithRouter } from '../../containers/nav/FooterContainer';

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
import { Nickname, PIcon } from '../../containers/modal/ModalContainer';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { ContentType } from '../../modules/modal';

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
  menuDisplay,
  handleClickHiddenMenu,
  bottomModalDisplay,
  handleBottomModal,
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
        <div>
          <button
            onClick={() => handleBottomModal(ContentType.Login, true)}
            style={{ width: '10px' }}
          >
            {' '}
          </button>
          {/* 위의 함수 floating nav에 붙이기 - 비로그인 시 작동 */}
        </div>
        <ModalMask
          className='modalMask'
          onClick={() => {
            handleClickHiddenMenu(false);
            handleBottomModal(ContentType.Empty, false);
          }}
          style={
            menuDisplay || bottomModalDisplay
              ? {
                  opacity: 1,
                  visibility: 'visible',
                  transition: 'visibility 0.8s linear, opacity 0.8s linear',
                }
              : {
                  opacity: 0,
                  visibility: 'hidden',
                  transition: 'visibility 0.8s linear, opacity 0.8s linear',
                }
          }
        ></ModalMask>

        <SideNav style={menuDisplay ? { right: '0' } : { right: '-100%' }}>
          <CloseBtn onClick={() => handleClickHiddenMenu(false)} />
          {isLogin ? (
            <SubNavUserInfo>
              <SubNavProfileWrap>
                {profile === '' || profile === undefined ? (
                  <NavPIcon2 />
                ) : (
                  <SubNavProfile src={profile} />
                )}
              </SubNavProfileWrap>
              <InfoText>
                <SubNickname>
                  <BeerIcon />
                  {userData.nickname}
                </SubNickname>
                <SubBtn
                  onClick={() => {
                    handleClickMypage();
                    handleClickHiddenMenu(false);
                  }}
                >
                  마이페이지
                </SubBtn>
                <SubBtn
                  onClick={() => {
                    handleClickLogout();
                    handleClickHiddenMenu(false);
                  }}
                >
                  로그아웃
                </SubBtn>
              </InfoText>
            </SubNavUserInfo>
          ) : (
            <LoginContainerWithRouter />
          )}
          <SubFooter
            style={menuDisplay ? { bottom: '25px' } : { bottom: '-100%' }}
          >
            <FooterContainerithRouter />
          </SubFooter>
        </SideNav>

        <MobileModal
          style={bottomModalDisplay ? { bottom: '0' } : { bottom: '-100%' }}
        >
          <CloseBtn
            onClick={() => {
              handleClickHiddenMenu(false);
              handleBottomModal(ContentType.Empty, false);
            }}
          />
          <LoginContainerWithRouter />
          <SubFooter
            style={
              bottomModalDisplay ? { bottom: '25px' } : { bottom: '-100%' }
            }
          >
            <FooterContainerithRouter />
          </SubFooter>
        </MobileModal>

        <Wrap className='searchbarWrap'>
          <SearchbarArea className='searchbarArea'>
            {isLogin ? (
              <>
                <SearchIcon
                  className='searchIcon'
                  style={{ cursor: 'default' }}
                />
                <SearchInputWrap className='searchInputWrap'>
                  <Input
                    type='text'
                    placeholder='검색어를 입력해주세요.'
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
                    style={{ cursor: 'default', width: '3em' }}
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
                      placeholder='검색어를 입력해주세요.'
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

          <Hamberger onClick={() => handleClickHiddenMenu(!menuDisplay)} />
        </Wrap>
      </NavBar>
    </Container>
  );
};

/*
{isLogin ? (
  <SubNavUserInfo>
    <SubNavProfileWrap>
      {profile === '' || profile === undefined ? (
        <NavPIcon2 />
      ) : (
        <SubNavProfile src={profile} />
      )}
    </SubNavProfileWrap>
    <InfoText>
      <SubNickname>
        <BeerIcon />
        {userData.nickname}
      </SubNickname>
      <SubBtn
        onClick={() => {
          handleClickMypage();
          handleClickHiddenMenu(false);
        }}
      >
        마이페이지
      </SubBtn>
      <SubBtn
        onClick={() => {
          handleClickLogout();
          handleClickHiddenMenu(false);
        }}
      >
        로그아웃
      </SubBtn>
    </InfoText>
  </SubNavUserInfo>
) : 
*/

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
  @media (max-width: 768px) {
    justify-content: flex-end;
    padding: 0.3em 0 0 0;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 70%;
  @media (max-width: 768px) {
    display: none;
  }
`;
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 100px;
  max-height: 100px;
  width: 10vw;
  height: 10vw;

  border-radius: 50%;
  overflow: hidden;
  margin: 0 0 0 1.5em;
  @media (max-width: 768px) {
    margin: 0 0 0 0.8em;
    min-width: 55px;
    min-height: 55px;
  }
  @media (max-width: 414px) {
    margin: 0;
    min-width: 45px;
    min-height: 45px;
  }
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

  width: 1.5em;
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
  min-width: 260px;
  border: 0px solid ${mainYellow};
  border-radius: 8px;
  margin: 0 0.8em 0 0.6em;
  padding: 0.4em 0.5em 0.3em 0.5em;

  font-size: 0.9em;
  background-color: ${lightGrey1};
  &:focus {
    outline: none;
  }
  @media (max-width: 1024px) {
    width: 200px;
    height: 2em;
    min-width: 200px;
    margin: 0 0.3em 0 0.4em;
    font-size: 0.95em;
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
  @media (max-width: 1024px) {
    margin: 0 1em 0.05em 0.05em;
    padding: 0.375em 0.5em 0.3em 0.5em;
  }
`;

const BtnArea = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  width: auto;
  height: 3em;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;
  background-color: ${mainYellow};

  margin: 0 0em 0.1em 0.5em;
  padding: 0.4em 0.7em 0.35em 0.7em;

  font-size: 1.1em;
  font-weight: 300;

  color: #fff;
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
const MenuIconWrap = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
const Hamberger = styled(HiOutlineMenuAlt3)`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    width: 1.5em;
    height: 1.5em;
    margin: 0 0.4em 0 0;
    color: ${mainYellow};
  }
`;
const ModalMask = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    z-index: 8;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const CloseBtn = styled(CgClose)`
  display: flex;
  width: 1.6em;
  height: 1.6em;

  margin: 1em 0 0 1em;

  color: ${mainGrey};
  &:hover {
    cursor: pointer;
    color: #989898;
    text-decoration: none;
  }
`;

const MobileModal = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;

    position: fixed;
    z-index: 10;
    overflow-y: hidden;
    overflow: hidden;
    left: 0;
    height: 90vh;
    width: 100vw;

    border-radius: 24px 24px 0 0;

    background-color: white;
    box-shadow: -5px 0 1em rgba(0, 0, 0, 0.1);
    transition: bottom 0.8s ease-in;
  }
`;
const SideNav = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;

    position: fixed;
    z-index: 10;
    top: 0;
    right: -100%;
    overflow-x: hidden;
    overflow: hidden;
    height: 100vh;
    width: 400px;

    background-color: white;
    box-shadow: -5px 0 1em rgba(0, 0, 0, 0.1);
    transition: right 0.7s ease-in;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const NavPIcon2 = styled(PIcon)`
  width: 35px;
  height: 35px;
  margin: 0 0 0.2em -0.5em;
  padding: 0;
`;
const SubNavUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2.5em 0 0 0.5em;

  color: ${mainGrey};
`;
const SubNavProfileWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 6em;
  height: 6em;
  // border: 2px solid ${mainYellow};
  border-radius: 50%;
  overflow: hidden;
`;
const SubNavProfile = styled.img`
  height: 150%;
  width: 150%;
  // max-height: 100vh;
  // max-width: 100vh;
  object-fit: contain;
`;
const InfoText = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1em 0 0 0;
`;
const SubNickname = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 0 1em 0;
  font-size: 1.1em;
`;
const SubBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;
  background-color: ${mainYellow};

  width: 130px;
  margin: 0 0em 0.6em 0.5em;
  padding: 0.45em 0.7em 0.35em 0.7em;

  font-size: 1em;
  font-weight: 300;

  color: #fff;
  &:hover {
    background-color: ${mainGrey};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
const BeerIcon = styled(BiBeer)`
  width: 1.2em;
  height: 1.2em;
  margin: 0 0.3em 0.1em 0;
  color: ${mainYellowOpac};
`;
const SubFooter = styled.div`
  display: none;
  position: fixed;
  right: 25px;
  transition: bottom 0.8s ease-in;
  @media (max-width: 768px) {
    display: block;
  }
  @media (max-width: 360px) {
    bottom: 20px;
  }
`;
