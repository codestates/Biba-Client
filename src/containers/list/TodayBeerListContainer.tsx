import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { getBeerAction, BeerT } from '../../modules/getbeer';
import TodayBeerList from '../../components/list/TodayBeerList';

import { fakedata } from '../../modules/getbeer';
import { HomeProps } from '../../containers/page/HomeContainer';

// const beers = Axios.get<BeerT[]>('https://biba.com/beer/list-all');

function TodayBeerListContainer({
  match,
  history,
  location,
  getBeerDetail,
}: HomeProps): JSX.Element {
  const beers = useSelector((state: RootState) => state.getBeer.beers);

  return <TodayBeerList beers={fakedata} getBeerDetail={getBeerDetail} />;
}

export const TodayBeerListContainerWithRouter = withRouter(
  TodayBeerListContainer,
);
