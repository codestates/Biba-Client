import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import {
  BEER_HOT,
  BEER_LATE,
  BEER_WHEAT,
  BEER_GERMAN,
  BEER_RECOMMEND,
  BeerT,
} from '../../modules/getbeers';
import Carousel from 'react-elastic-carousel';
import '../../css/MobileHomeCss.css';
import TodayBeer from '../list/TodayBeer';
import WantSomeBeerList from '../../components/list/WantSomeBeerList';
import { BeerListProps } from '../../containers/page/HomeContainer';
import axios from 'axios';

function MobileHome({
  beers,
  setBeerDetail,
  setAllReviews,
}: BeerListProps): JSX.Element {
  const { userData, isLogin } = useSelector((state: RootState) => state.login);
  const hotBeers = useSelector((state: RootState) => state.wantBeer.hotBeers);
  const lateBeers = useSelector((state: RootState) => state.wantBeer.lateBeers);
  const wheatBeers = useSelector(
    (state: RootState) => state.wantBeer.wheatBeers,
  );
  const germanBeers = useSelector(
    (state: RootState) => state.wantBeer.germanBeers,
  );
  const recommendBeers = useSelector(
    (state: RootState) => state.wantBeer.recommendBeers,
  );
  const dispatch = useDispatch();

  /* eslint-disable react-hooks/exhaustive-deps */
  const setHotBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_HOT, beers });
  };
  const setLateBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_LATE, beers });
  };
  const setWheatBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_WHEAT, beers });
  };
  const setGermanBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_GERMAN, beers });
  };
  const setRecommendBeers = (beers: BeerT[]) => {
    dispatch({ type: BEER_RECOMMEND, beers });
  };

  useEffect(() => {
    axios.get<BeerT[]>(`https://beer4.xyz/category/popular`).then((res) => {
      setHotBeers(res.data);
    });
    axios.get<BeerT[]>(`https://beer4.xyz/category/recent`).then((res) => {
      setLateBeers(res.data);
    });
    axios.get<BeerT[]>(`https://beer4.xyz/category/wheat`).then((res) => {
      setWheatBeers(res.data);
    });
    axios.get<BeerT[]>(`https://beer4.xyz/category/germany`).then((res) => {
      setGermanBeers(res.data);
    });
    axios
      .post<BeerT[]>(`https://beer4.xyz/category/recommend`, {
        user_id: userData.id,
      })
      .then((res) => {
        setRecommendBeers(res.data);
      });
  }, []);

  const todayBeerList = beers.map((beer) => (
    <TodayBeer
      id={beer.id}
      key={beer.id}
      name={beer.beer_name}
      image={beer.mobile}
      rate={beer.rate}
      setBeerDetail={setBeerDetail}
      setAllReviews={setAllReviews}
    />
  ));
  const breakPoints = [
    { width: 768, itemsToShow: 2 },
    { width: 425, itemsToShow: 3 },
    { width: 375, itemsToShow: 3 },
  ];
  return (
    <Container className='mobile_home'>
      <Section>
        <SectionTitle>Today&apos;s Beer</SectionTitle>
        <Carousel breakPoints={breakPoints}>{todayBeerList}</Carousel>
      </Section>
      <Section>
        <SectionTitle>Want Some Beer</SectionTitle>
        <List>
          <WantSomeBeerList
            isLogin={isLogin}
            nickname={userData.nickname}
            hotBeers={hotBeers}
            lateBeers={lateBeers}
            wheatBeers={wheatBeers}
            germanBeers={germanBeers}
            recommendBeers={recommendBeers}
            setBeerDetail={setBeerDetail}
            setAllReviews={setAllReviews}
          />
        </List>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Section = styled.div``;

const SectionTitle = styled.div`
  @media (max-width: 768px) {
    padding: 20px;
    font-size: 1.3em;
  }
`;

const List = styled.div`
  @media (max-width: 768px) {
    padding-left: 20px;
    margin-top: -20px;
  }
`;

export default MobileHome;
