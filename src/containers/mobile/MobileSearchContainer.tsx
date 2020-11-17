import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { BeerT } from '../../modules/getbeers';
import { DefaultProps, DetailProps, HomeProps } from '../page/HomeContainer';

import { MobileSearch } from '../../components/mobile/MobileSearch';
import { MOBILE_SEARCH } from '../../modules/changepage';

export interface MobileSearchProps extends DefaultProps, DetailProps {
  inputQuery: {
    query: string;
  };
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSearch(): void;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
}

export const MobileSearchContainer = ({
  match,
  history,
  location,
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element => {
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
  const handleClickSearchBtn = (): void => {
    dispatch({ type: 'PRESS_SEARCHBTN', activate: true });
  };
  const handleSearch = (): void => {
    if (inputQuery.query.length < 2) {
      alert('2글자 이상 입력해주세요.');
    } else {
      handleClickSearchBtn();
      axios
        .get<Array<BeerT>>(`https://beer4.xyz/search/${inputQuery.query}`)
        .then((res) => {
          if (res.status === 200) {
            const beers = res.data;
            setBeers(beers);
            setInputQuery({ ...inputQuery, query: '' });
            dispatch({ type: MOBILE_SEARCH });
          }
        })
        .catch(() => {
          // dispatch({ type: 'SEARCH_BEER' });
        });
    }
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSearch();
  };
  return (
    <MobileSearch
      match={match}
      history={history}
      location={location}
      inputQuery={inputQuery}
      handleOnChange={handleOnChange}
      handleSearch={handleSearch}
      pressEnter={pressEnter}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
};

export const MobileSearchContainerWithRouter = withRouter(
  MobileSearchContainer,
);
