import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { MatchParams } from '../../containers/page/BeerDetailContainer';

export const BeerDetail = ({
  match,
}: RouteComponentProps<MatchParams>): JSX.Element => {
  const { beerId } = match.params;
  return (
    <div>
      <div>{beerId}</div>
    </div>
  );
};
