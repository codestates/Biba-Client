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
} from '../nav/color';

import { MobileSearchProps } from '../../containers/mobile/MobileSearchContainer';

export const MobileSearch = ({
  inputQuery,
  handleOnChange,
  handleSearch,
  searchResults,
  pressEnter,
}: MobileSearchProps): JSX.Element => {
  return (
    <MobileSearchContainer>
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
      <SearchTags>인기 검색어 태그{searchResults()}</SearchTags>
      <SearchRecommend>추천 맥주 리스트</SearchRecommend>
    </MobileSearchContainer>
  );
};

const MobileSearchContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2em 0 0 0;
  }
`;
const MobileSearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const MobileInput = styled.input`
  display: flex;

  width: 68vw;
  border: 0px solid ${mainYellow};
  border-radius: 8px;
  margin: 0 0.4em 0 0.4em;
  padding: 0.45em 0.55em 0.35em 0.55em;
  font-size: 0.95em;
  background-color: ${lightGrey1};

  &:focus {
    outline: none;
  }
  @media (max-width: 320px) {
    width: 65vw;
  }
`;

const MobileSearchBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 8px;
  margin: 0 0 0.05em 0;
  padding: 0.4em 0.6em 0.3em 0.6em;
  font-size: 0.95em;
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

const SearchTags = styled.div`
  display: flex;
  width: 78vw;
  margin: 1.5em 0 0 0;
`;
const SearchRecommend = styled.div`
  display: flex;
  width: 78vw;
  margin: 1.5em 0 0 0;
`;
