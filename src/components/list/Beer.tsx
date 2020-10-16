import React from 'react';
import styled from 'styled-components';

export interface BeerProps {
  key: number;
  name: string;
  image: string;
  rate: number;
}

function Beer({ name, image, rate }: BeerProps): JSX.Element {
  return (
    <BeerImage>
      <Text>{name}</Text>
      <Text>{image}</Text>
      <Text>{rate}</Text>
    </BeerImage>
  );
}

const BeerImage = styled.div`
  height: 30vh;
  width: 15vw;
  text-align: center;
  position: relative;
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Beer;
