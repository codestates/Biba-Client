import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { BeerDetail } from '../../components/page/BeerDetail';

export interface BeerDetailProps {
  name: string;
}
const BeerDetailContainer = (props: RouterProps): JSX.Element => {
  const name = 'test';
  return <BeerDetail name={name} />;
};

export const BeerDetailWithRouter = withRouter(BeerDetailContainer);
