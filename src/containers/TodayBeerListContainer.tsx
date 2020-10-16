import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getBeerAction, BeerT } from '../modules/getbeer';
import TodayBeerList from '../components/list/TodayBeerList';
import Axios from 'axios';

// const beers = Axios.get<BeerT[]>('https://biba.com/beer/list-all');
const fakedata = [
  { id: 1, beer_name: '사무엘 앤더슨', beer_img: 'image', rate: 5 },
];
function TodayBeerListContainer(): any {
  const beers = useSelector((state: RootState) => state.getBeer.beers);

  return <TodayBeerList beers={fakedata} />;
}

export default TodayBeerListContainer;
