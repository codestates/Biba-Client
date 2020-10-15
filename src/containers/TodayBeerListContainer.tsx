import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBeerAction } from '../modules/getbeer';
import TodayBeerList from '../components/list/TodayBeerList';

function TodayBeerListContainer(): JSX.Element {
  const beerList = useSelector((state: RootState) => state.getBeer.beers);
  const dispatch = useDispatch();

  const getBeer = () => {
    dispatch(getBeerAction(beerList));
  };

  return <TodayBeerList getBeer={getBeer} />;
}

export default TodayBeerListContainer;
