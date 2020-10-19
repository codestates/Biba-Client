import React from 'react';
import { RouterProps, withRouter } from 'react-router';

import Home from '../../components/page/Home';

function HomeContainer(props: RouterProps): JSX.Element {
  return <Home props={props} />;
}

export const HomeContainerWithRouter = withRouter(HomeContainer);
