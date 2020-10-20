import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { searchBeerAction } from '../../modules/searchbeer';
import SearchBeerList from '../../components/list/SearchBeerList';
import Axios from 'axios';

import { fakedata } from '../../modules/getbeer';
import { HomeProps } from '../../containers/page/HomeContainer';

// const beers = Axios.get<BeerT[]>('https://biba.com/beer/list-all');

function SearchBeerListContainer({
  match,
  history,
  location,
  setBeerDetail,
}: HomeProps): JSX.Element {
  const beers = useSelector((state: RootState) => state.searchBeer.beers);

  return (
    <Container>
      <SearchBeerList beers={fakedata} setBeerDetail={setBeerDetail} />;
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  border: solid 2px gray;
`;

export const SearchBeerListContainerWithRouter = withRouter(
  SearchBeerListContainer,
);
