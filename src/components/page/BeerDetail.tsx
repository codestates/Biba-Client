import React from 'react';
import styled from 'styled-components';

import { BeerDetailProps } from '../../containers/page/BeerDetailContainer';

export const BeerDetail = ({
  match,
  beerDetail,
}: BeerDetailProps): JSX.Element => {
  const { id } = match.params;

  return (
    <div>
      <div>{JSON.stringify(beerDetail)}</div>
    </div>
  );
};
