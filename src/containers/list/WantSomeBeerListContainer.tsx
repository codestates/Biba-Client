import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { getBeerAction, BeerT } from '../../modules/getbeer';
import WantSomeBeerList from '../../components/list/WantSomeBeerList';
import Axios from 'axios';

import { fakedata } from '../../modules/getbeer';
import { HomeProps } from '../../containers/page/HomeContainer';

// const beers = Axios.get<BeerT[]>('https://biba.com/beer/list-all');

function WantSomeBeerListContainer({
  match,
  history,
  location,
  setBeerDetail,
  setAllReviews,
}: HomeProps): JSX.Element {
  const beers = useSelector((state: RootState) => state.getBeer.beers);

  return (
    <WantSomeBeerList
      beers={fakedata}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  );
}

export const WantSomeBeerListContainerWithRouter = withRouter(
  WantSomeBeerListContainer,
);
