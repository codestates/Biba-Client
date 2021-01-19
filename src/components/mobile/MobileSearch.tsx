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
  chartAccent2,
  chartYellow2,
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
  handleClickTag,
  pressEnter,
  setBeerDetail,
  setAllReviews,
}: MobileSearchProps): JSX.Element => {
  const searchBeers = useSelector((state: RootState) => state.searchBeer.beers);
  const { activate } = useSelector((state: RootState) => state.mobileSearchBtn);
  const { recommend, tags } = useSelector(
    (state: RootState) => state.searchPageInfo,
  );

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
  const tagList = tags.map((tag) => (
    <SearchTag
      id={tag}
      className='searchPageTag'
      key={`searchTag${tags.indexOf(tag)}`}
      onClick={handleClickTag}
    >
      {tag}
    </SearchTag>
  ));
  const recommendBeers = recommend.map((beer) => (
    <RBeerWrap
      id={String(beer.id)}
      key={beer.id}
      onClick={(e) => {
        setBeerDetail(e);
        setAllReviews(e);
      }}
    >
      <RBImgDiv>
        <RBeerImg src={beer.beer_img}></RBeerImg>
      </RBImgDiv>
      <RBName>{beer.beer_name}</RBName>
    </RBeerWrap>
  ));
  return (
    <MobileSearchContainer className='MobileSearchContainer'>
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
          <SearchTagArea className='searchTagsArea'>
            <SearchInfoTitle>인기 검색어</SearchInfoTitle>
            <SearchTagList>{tagList}</SearchTagList>
          </SearchTagArea>
          <SearchRecommendArea className='searchRecommendArea'>
            <SearchInfoTitle>추천 맥주 리스트</SearchInfoTitle>
            <RecommendBeers>{recommendBeers}</RecommendBeers>
          </SearchRecommendArea>
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
    margin: 2em 0 2em 0;
  }
  color: ${mainGrey};
`;
const MobileSearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const MobileInput = styled.input`
  display: flex;
  width: 69vw;
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
  @media (max-width: 768px) {
    display: flex;
  }
`;
const SearchInfoTitle = styled.div`
  margin: 0 0 0.4em;
  font-size: 1.08em;
  font-weight: 600;

  color: ${mainYellow};
`;
const SearchTagArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 1.7em 0 0em 0;
`;
const SearchTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0.3em 0 0 0;
`;
const SearchTag = styled.div`
  cursor: pointer;
  display: flex;
  border-radius: 6px 6px 6px 6px;
  background-color: ${chartYellow2};
  margin: 0 0.5em 0.8em 0;
  padding: 0.5em 0.7em 0.3em 0.7em;
  font-size: 0.92em;
  font-weight: 400;
  color: ${mainGrey};
  &:hover {
    background-color: ${chartAccent2};
  }
`;
const SearchRecommendArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 1em 0 0 0;
`;
const RecommendBeers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 2px 0 0;
`;
const RBeerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 38vw;
  height: 38vw;
  border-radius: 16px;
  box-shadow: 1px 1px 1px rgba(255, 108, 40, 0.6);

  margin: 0 0 0.5em 0;
`;
const RBImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28vw;
  overflow: hidden;
  margin: 0.5em 0 0 0;
`;
const RBeerImg = styled.img`
  display: flex;

  height: 100%;
`;
const RBName = styled.div`
  display: inline-block;
  width: 30vw;
  margin: 0.45em 0 0.5em 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 0.9em;
`;
