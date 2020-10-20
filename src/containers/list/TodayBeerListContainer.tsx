import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { getBeerAction, BeerT } from '../../modules/getbeer';
import TodayBeerList from '../../components/list/TodayBeerList';
import axios from 'axios';

import { fakedata } from '../../modules/getbeer';
import { IBeerDetail, ObjBeerDetail } from '../../modules/beerdetail';
import { DefaultProps } from '../../containers/page/HomeContainer';

// const beers = Axios.get<BeerT[]>('https://biba.com/beer/list-all');

function TodayBeerListContainer({ match }: DefaultProps): JSX.Element {
  const beers = useSelector((state: RootState) => state.getBeer.beers);
  const dispatch = useDispatch();
  // store에 각각 beerdetail 넣는 함수
  const setBeerDetail = (beerDetail: IBeerDetail) => {
    dispatch({ type: 'SET_BEERDETAIL', beerDetail });
  };
  const getBeerDetail = (): void => {
    axios
      .get<IBeerDetail>(`http://localhost:4000/custom/scrap/${match.params.id}`)
      .then((res) => {
        setBeerDetail(res.data);
      });
  };

  return <TodayBeerList beers={fakedata} />;
}

export const TodayBeerListContainerWithRouter = withRouter(
  TodayBeerListContainer,
);
