import React from 'react';
import { RouterProps, withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Home from '../../components/page/Home';
import { RootState } from '../../modules';

export interface MatchParams {
  id: string;
}
export type DefaultProps = RouteComponentProps<MatchParams>;

function HomeContainer({
  match,
  history,
  location,
}: DefaultProps): JSX.Element {
  return <Home match={match} history={history} location={location} />;
}

export const HomeContainerWithRouter = withRouter(HomeContainer);
