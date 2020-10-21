import React from 'react';
import { withRouter } from 'react-router-dom';

import MyBeer from '../../components/page/MyBeer';

function MyBeerContainer(): JSX.Element {
  return <MyBeer />;
}

export const MyBeerContainerWithRouter = withRouter(MyBeerContainer);
