import React from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../modules';
import { Footer } from '../../components/nav/Footer';

export const FooterContainer = (props: RouterProps): JSX.Element => {
  return <Footer />;
};

export const FooterContainerithRouter = withRouter(FooterContainer); // nav도 router 필요한지 체크 필요
