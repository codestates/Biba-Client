import React from 'react';
import styled from 'styled-components';

export const Beer: React.FC = () => {
  return (
    <BeerImage>
      <Text>Beer</Text>
    </BeerImage>
  );
};

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
