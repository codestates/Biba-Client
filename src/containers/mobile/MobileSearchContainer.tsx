import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { BeerT } from '../../modules/getbeers';
import { DefaultProps } from '../page/HomeContainer';

import { MobileSearch } from '../../components/mobile/MobileSearch';
import RequsetBeer from '../../components/list/RequestBeer';

export interface MobileSearchProps extends DefaultProps {
  inputQuery: {
    query: string;
  };
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSearch(): void;
  searchResults(): JSX.Element;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
}

export const MobileSearchContainer = (props: DefaultProps): JSX.Element => {
  const [inputQuery, setInputQuery] = useState({ query: '' });
  const searchBeers = useSelector((state: RootState) => state.searchBeer.beers);
  const dispatch = useDispatch();
  const setBeers = (beers: BeerT[]): void => {
    dispatch({ type: 'SET_BEERS', beers });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { value } = e.target;
    setInputQuery({ ...inputQuery, query: value });
  };
  const handleSearch = (): void => {
    if (inputQuery.query.length < 2) {
      alert('2글자 이상 입력해주세요.');
    } else {
      axios
        .get<Array<BeerT>>(`https://beer4.xyz/search/${inputQuery.query}`)
        .then((res) => {
          if (res.status === 200) {
            const beers = res.data;
            setBeers(beers);
            setInputQuery({ ...inputQuery, query: '' });
          }
        })
        .catch(() => {
          // dispatch({ type: 'SEARCH_BEER' });
        });
    }
  };

  // reducer 추가 - 검색 버튼 누르면 활성화 - 결과 보여주는 div 박스 or request beer 나올 수 있게 display
  const searchResults = (): JSX.Element => {
    return searchBeers.length !== 0 ? (
      <>
        {searchBeers.map((beer) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <div>{beer.beer_name}</div>
          </div>
        ))}
      </>
    ) : (
      <>{/* <RequsetBeer /> */}</>
    );
  };
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSearch();
  };
  return (
    <MobileSearch
      match={props.match}
      history={props.history}
      location={props.location}
      inputQuery={inputQuery}
      handleOnChange={handleOnChange}
      handleSearch={handleSearch}
      searchResults={searchResults}
      pressEnter={pressEnter}
    />
  );
};

export const MobileSearchContainerWithRouter = withRouter(
  MobileSearchContainer,
);
