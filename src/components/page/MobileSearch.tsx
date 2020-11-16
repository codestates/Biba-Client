import React from 'react';
import styled from 'styled-components';
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

import { MobileSearchProps } from '../../containers/page/MobileSearchContainer';

export const MobileSearch = ({
  location,
  inputQuery,
  handleOnChange,
  handleSearch,
  pressEnter,
}: MobileSearchProps): JSX.Element => {
  return (
    <MobileSearchContainer>
      {console.log(location.pathname)}
      <MobileSearchInputWrap className='searchInputWrap'>
        <MobileInput
          type='text'
          placeholder='검색어를 입력해주세요.'
          value={inputQuery.query}
          onChange={handleOnChange}
          onKeyPress={pressEnter}
        ></MobileInput>
        <MobileSearchBtn onClick={handleSearch}>Biba!</MobileSearchBtn>
      </MobileSearchInputWrap>
      <div>인기 검색어 태그</div>
      <div>추천 맥주 리스트</div>
    </MobileSearchContainer>
  );
};
const MobileSearchContainer = styled.div`
  display: none;

  @media (max-width: 414px) {
    display: flex;
    flex-direction: column;
  }
`;
const MobileSearchInputWrap = styled.div`
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

const MobileInput = styled.input`
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
  @media (max-width: 414px) {
    height: 2.2em;
    margin: 0 -2.2em 0 0.3em;
  }
  @media (max-width: 360px) {
    width: 180px;
    min-width: 180px;
    height: 2.1em;
    margin: 0 -2.4em 0 0.3em;
    font-size: 0.9em;
  }
`;

const MobileSearchBtn = styled.button`
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
  @media (max-width: 414px) {
    margin: 0 0.8em 0.05em 0;
    padding: 0.4em 0.5em 0.3em 0.5em;

    font-size: 0.8em;
  }
  @media (max-width: 360px) {
    padding: 0.3em 0.4em 0.2em 0.4em;
  }
`;
