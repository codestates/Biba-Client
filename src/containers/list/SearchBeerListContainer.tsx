import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import SearchBeerList from '../../components/list/SearchBeerList';
import { HomeProps } from '../../containers/page/HomeContainer';

function SearchBeerListContainer({
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const beers = useSelector((state: RootState) => state.searchBeer.beers);

  return (
    <SearchBeerList
      beers={beers}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const SearchBeerListContainerWithRouter = withRouter(
  SearchBeerListContainer,
);
