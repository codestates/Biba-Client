import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { BeerT } from '../../modules/getbeers';
import { DefaultProps } from '../page/HomeContainer';

import { MobileSearch } from '../../components/mobile/MobileSearch';

export interface MobileSearchProps extends DefaultProps {
  inputQuery: {
    query: string;
  };
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSearch(): void;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
}

export const MobileSearchContainer = (props: DefaultProps): JSX.Element => {
  const [inputQuery, setInputQuery] = useState({ query: '' });
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
            // console.log(beers);
            // 받은 데이터로 store 상태 업데이트
            setBeers(beers);
            dispatch({ type: 'SEARCH_BEER' });
            setInputQuery({ ...inputQuery, query: '' });
            props.history.push('/');
          }
        })
        .catch(() => {
          dispatch({ type: 'SEARCH_BEER' });
        });
    }
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
      pressEnter={pressEnter}
    />
  );
};

export const MobileSearchContainerWithRouter = withRouter(
  MobileSearchContainer,
);
