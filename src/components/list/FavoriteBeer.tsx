import React from 'react';
import styled from 'styled-components';

export interface BeerProps {
  key: number;
  name: string;
  image: string;
  rate: number;
}

function FavoriteBeer({ name, image, rate }: BeerProps): JSX.Element {
  return (
    <BeerImage>
      <Image src={image} alt={name} />
    </BeerImage>
  );
}

const BeerImage = styled.div`
  height: 30vh;
  width: 12vw;
  text-align: center;
  border: 1px solid gray;
  border-radius: 1em;
  margin: 1em auto;
  padding: 1em;
  &:hover {
    transition: all ease 1s;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Image = styled.img`
  height: 80%;
  width: 50%;
`;

export default FavoriteBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
