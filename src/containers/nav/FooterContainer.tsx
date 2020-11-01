import React, { useEffect } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../../modules';
import { Footer } from '../../components/nav/Footer';

export interface FooterProps {
  count: number | string;
}

export const FooterContainer = (): JSX.Element => {
  const { count } = useSelector((state: RootState) => state.visitCount);

  return <Footer count={count} />;
};

export const FooterContainerithRouter = withRouter(FooterContainer); // nav도 router 필요한지 체크 필요
