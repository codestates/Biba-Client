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
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import SearchBeer from '../../components/list/SearchBeer';
import RequsetBeer from '../../components/list/RequestBeer';
import Masonry from 'react-masonry-css';
import '../../css/MobileSearchCss.css';

export const MobileSearch = ({
  inputQuery,
  handleOnChange,
  handleSearch,
  pressEnter,
  setBeerDetail,
  setAllReviews,
}: MobileSearchProps): JSX.Element => {
  const isSearchM = useSelector(
    (state: RootState) => state.changePage.isSearchM,
  );
  const searchBeers = useSelector((state: RootState) => state.searchBeer.beers);
  const { activate } = useSelector((state: RootState) => state.mobileSearchBtn);

  const breakpointColumnsObj = {
    default: 2,
    768: 3,
    425: 2,
  };
  let sbList;
  let exist = false;
  if (searchBeers.length !== 0) {
    exist = true;
    sbList = searchBeers.map((beer) => (
      <SearchBeer
        id={beer.id}
        key={beer.id}
        name={beer.beer_name}
        image={beer.beer_img}
        rate={beer.rate}
        setBeerDetail={setBeerDetail}
        setAllReviews={setAllReviews}
      />
    ));
  } else {
    sbList = <RequsetBeer />;
  }
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
      {activate ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='search-my-masonry-grid'
          columnClassName='search-my-masonry-grid_column'
        >
          {sbList}
        </Masonry>
      ) : (
        <>
          <SearchTags>인기 검색어 태그</SearchTags>
          <SearchRecommend>추천 맥주 리스트</SearchRecommend>
        </>
      )}
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
  @media (max-width: 425px) {
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
  @media (max-width: 360px) {
    width: 65vw;
  }
`;

const MobileSearchBtn = styled.button`
  display: inline-block;
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
