import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../modules';

export const Nav: React.FC = (props) => {
  const dispatch = useDispatch();
  const navState = useSelector((store: RootState) => store.signin);

  return <>{}</>;
};
