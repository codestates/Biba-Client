import React, { useEffect } from 'react';
import Axios from 'axios';
import { TodayBeerList } from '../list/TodayBeerList';

//get beer list from server
useEffect(() => {
  Axios.get('').then((res) => console.log(res));
}, []);

export const Home: React.FC = () => {
  return <TodayBeerList />;
};
