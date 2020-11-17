import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ContentType } from '../../modules/modal';
import { mainGrey, mainYellow, mainYellowOpac } from '../nav/color';

export interface BeerProps {
  id: string;
  key: string;
  name: string;
  image: string;
  rate: number;
}

function RequsetBeer(): JSX.Element {
  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const handleBottomModal = (
    contentType: ContentType,
    display: boolean,
  ): void => {
    dispatch({ type: 'SET_BOTTOM_MODAL', contentType, display });
  };

  const BeerRequestModal = (): void => {
    handleModal(ContentType.RequestBeer, true);
  };
  const BeerRequestBottomModal = (): void => {
    handleBottomModal(ContentType.RequestBeer, true);
  };
  return (
    <Box>
      <H3>맥주를 찾을 수 없습니다</H3>
      <Button onClick={BeerRequestModal}>맥주 등록 요청</Button>
      <MButton onClick={BeerRequestBottomModal}>맥주 등록 요청</MButton>
    </Box>
  );
}

const Box = styled.div`
  width: 50%;
  height: 150px;
  border-radius: 1em;
  border: 3px solid ${mainYellowOpac};
  text-align: center;
  color: ${mainGrey};
  font-weight: 500;
`;

const H3 = styled.div`
  font-size: 2em;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const Button = styled.button`
  border-radius: 5px;
  border: 0;
  padding: 0.4em 0.7em 0.35em 0.7em;
  font-size: 1.1em;
  font-weight: 400;
  color: white;
  background-color: ${mainYellow};
  &:hover {
    background-color: ${mainGrey};
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    display: none;
    pointer-events: none;
  }
`;
const MButton = styled.button`
  pointer-events: none;
  display: none;
  border-radius: 5px;
  border: 0;
  padding: 0.4em 0.7em 0.35em 0.7em;
  font-size: 1.1em;
  font-weight: 400;
  color: white;
  background-color: ${mainYellow};
  &:hover {
    background-color: ${mainGrey};
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    cursor: pointer;
    pointer-events: auto;
    display: inline-block;
  }
`;

export default RequsetBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
