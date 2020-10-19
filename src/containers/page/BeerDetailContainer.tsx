import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { BeerDetail } from '../../components/page/BeerDetail';

export interface MatchParams {
  beerId: string; // number
}

const BeerDetailContainer = ({
  match,
  history,
  location,
}: RouteComponentProps<MatchParams>): JSX.Element => {
  return <BeerDetail match={match} history={history} location={location} />;
};

export const BeerDetailWithRouter = withRouter(BeerDetailContainer);
