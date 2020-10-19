import React from 'react';
import styled from 'styled-components';

export interface BeerProps {
  key: number;
  name: string;
  image: string;
  rate: number;
}

function WantSomeBeer({ name, image, rate }: BeerProps): JSX.Element {
  return <Image src={image} alt={name} />;
}

const Image = styled.img`
  height: 15vh;
  width: 8vw;
  border: 1px solid gray;
  border-radius: 1em;
  margin-right: 1em;
  &:hover {
    transition: all ease 1s;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export default WantSomeBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
