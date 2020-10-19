import React from 'react';
import styled from 'styled-components';

import { BeerDetailProps } from '../../containers/page/BeerDetailContainer';

export const BeerDetail = ({ name }: BeerDetailProps): JSX.Element => {
  return (
    <div>
      <div>test test test{name}</div>
    </div>
  );
};
