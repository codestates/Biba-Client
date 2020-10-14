import React from 'react';
import styled from 'styled-components';

import { Beer } from './Beer';

export const TodayBeerList: React.FC = () => {
  return (
    <BeerList>
      <Beer color='blue' />
      <Beer color='red' />
      <Beer color='yellow' />
      <Beer color='green' />
      <Beer color='pupple' />
    </BeerList>
  );
};

const BeerList = styled.div`
  position: relative;
  height: 100%;
  overflow-y: scroll;
`;
