import React from 'react';
import styled from 'styled-components';

export const Beer: React.FC<{ color: string }> = ({ color }) => {
  return <BeerImage color={color}>BeerList</BeerImage>;
};

const BeerImage = styled.div`
  height: 300px;
  width: 100px;
  background: ${(props) => props.color};
`;
