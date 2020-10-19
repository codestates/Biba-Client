import React from 'react';
import { RouterProps, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import Home from '../../components/page/Home';

function HomeContainer({
  match,
  history,
  location,
}: RouteComponentProps): JSX.Element {
  return <Home match={match} history={history} location={location} />;
}

export const HomeContainerWithRouter = withRouter(HomeContainer);
