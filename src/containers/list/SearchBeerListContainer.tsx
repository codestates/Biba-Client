import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import SearchBeerList from '../../components/list/SearchBeerList';

import { fakedata } from '../../modules/getbeers';

// const beers = Axios.get<BeerT[]>('https://biba.com/beer/list-all');

function SearchBeerListContainer(): JSX.Element {
  const beers = useSelector((state: RootState) => state.searchBeer.beers);

  return (
    <Container>
      <SearchBeerList beers={beers} />;
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
  border: solid 1px gray;
`;

export const SearchBeerListContainerWithRouter = withRouter(
  SearchBeerListContainer,
);
