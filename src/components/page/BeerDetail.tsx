import React from 'react';
import styled from 'styled-components';

import {
  MatchParams,
  BeerDetailProps,
} from '../../containers/page/BeerDetailContainer';

export const BeerDetail = ({ match, data }: BeerDetailProps): JSX.Element => {
  const { beerId } = match.params;

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
