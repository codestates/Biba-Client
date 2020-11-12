import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import axios from 'axios';

import { MDMyBeerList } from '../../components/modal/MyBeerList';
import { RootState } from '../../modules';
import { IProfile } from '../user/MypageContainer';
import { IBeerDetail } from '../../modules/beerdetail';
import { IBeerDetailWithAll } from '../page/HomeContainer';
import { ModalContentProps } from './ModalContainer';

export interface MDMyBeerListProps {
  myBeerListImg: React.MutableRefObject<null>;
  option1: boolean;
  option2: boolean;
  handleRadioOption1(): void;
  handleRadioOption2(): void;
  mapOption1: JSX.Element[];
  mapOption2: JSX.Element[];
  setSelectedBeerId(id: number): void;
  handleSelectBeer(
    e: React.ChangeEvent<HTMLSelectElement>,
    option: boolean,
  ): void;
  handleClickBeerSelect(): void;
}

export const MDMyBeerListContainer = ({
  userData,
  isLogin,
  token,
  closeModal,
}: ModalContentProps): JSX.Element => {
  const { option1, option2 } = useSelector(
    (state: RootState) => state.myBeerListType,
  );
  const rawFavoriteBeers = useSelector(
    (state: RootState) => state.favoriteBeer.abcBeers,
  );
  const rawReviewedBeers = useSelector(
    (state: RootState) => state.reviewBeer.beers,
  );
  const selectedBeerId = useSelector(
    (state: RootState) => state.selectedBeer.id,
  );
  const dispatch = useDispatch();

  const handleMyListType = (option1: boolean, option2: boolean): void => {
    dispatch({ type: 'SET_MYBEERTYPE', option1, option2 });
  };
  const handleRadioOption1 = (): void => {
    handleMyListType(true, false);
  };
  const handleRadioOption2 = (): void => {
    handleMyListType(false, true);
  };
  const myBeerListImg = React.useRef(null);

  const favoriteBeerIndex = rawFavoriteBeers.map((beer) => {
    return {
      id: beer.id,
      beerName: beer.beer_name,
      image: beer.beer_img,
    };
  });
  const reviewedBeerIndex = rawReviewedBeers.map((beer) => {
    return { id: beer.id, beerName: beer.beer_name, image: beer.beer_img };
  });
  const mapOption1 = favoriteBeerIndex.map((ele) => (
    <BeerOptions
      id={ele.id}
      key={`favBeerIndex${favoriteBeerIndex.indexOf(ele)}`}
      value={ele.beerName}
    >
      {ele.beerName}
    </BeerOptions>
  ));
  const mapOption2 = reviewedBeerIndex.map((ele) => (
    <BeerOptions
      id={ele.id}
      key={`reviewedBeerIndex${reviewedBeerIndex.indexOf(ele)}`}
      value={ele.beerName}
    >
      {ele.beerName}
    </BeerOptions>
  ));
  const setSelectedBeerId = (id: number): void => {
    dispatch({ type: 'SET_SELECTEDBEER', id });
  };

  const handleSelectBeer = (
    // 사진 ref에 업로드만, 전송 x
    e: React.ChangeEvent<HTMLSelectElement>,
    option: boolean,
  ): void => {
    const { current } = myBeerListImg as React.RefObject<IProfile>;
    let imgTarget: {
      id: string;
      beerName: string;
      image: string;
    }[];
    if (option) {
      imgTarget = favoriteBeerIndex.filter(
        (ele) =>
          favoriteBeerIndex.indexOf(ele) === e.target.options.selectedIndex - 1,
      );
    } else {
      imgTarget = reviewedBeerIndex.filter(
        (ele) =>
          reviewedBeerIndex.indexOf(ele) === e.target.options.selectedIndex - 1,
      );
    }
    if (current) {
      current.src = imgTarget[0].image;
    }
  };

  const handleClickBeerSelect = (): void => {
    if (selectedBeerId !== -1) {
      axios
        .post<IBeerDetailWithAll>(`https://beer4.xyz/beer/${selectedBeerId}`, {
          user_id: userData.id,
          beer_id: selectedBeerId,
        })
        .then((res) => {
          // console.log(res.data);
          const compareBeer: IBeerDetail = res.data;
          dispatch({
            type: 'SET_COMPAREBEER',
            compareBeer: compareBeer,
          });

          const { sparkling, sweet, bitter, accessibility, body } = res.data;
          dispatch({
            type: 'SET_COMPAREDATA',
            sparkling,
            sweet,
            bitter,
            accessibility,
            body,
          });
        });
      setSelectedBeerId(-1);
      return closeModal();
    } else {
      return alert(`비교할 맥주를 선택해주세요.`);
    }
  };

  return (
    <MDMyBeerList
      myBeerListImg={myBeerListImg}
      option1={option1}
      option2={option2}
      mapOption1={mapOption1}
      mapOption2={mapOption2}
      handleRadioOption1={handleRadioOption1}
      handleRadioOption2={handleRadioOption2}
      setSelectedBeerId={setSelectedBeerId}
      handleSelectBeer={handleSelectBeer}
      handleClickBeerSelect={handleClickBeerSelect}
    />
  );
};

const BeerOptions = styled.option``;
