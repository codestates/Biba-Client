import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { getBeerAction, BeerT } from '../../modules/getbeer';
import TodayBeerList from '../../components/list/TodayBeerList';
import Axios from 'axios';

// const beers = Axios.get<BeerT[]>('https://biba.com/beer/list-all');

function WantSomeBeerContainer(): any {
  const beers = useSelector((state: RootState) => state.getBeer.beers);

  return <TodayBeerList beers={beers} />;
}

export const WantSomeBeerContainerWithRouter = withRouter(
  WantSomeBeerContainer,
);
