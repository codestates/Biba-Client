import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Search from '../containers/Search';

import { RootState } from '../../reducers';

export const Nav: React.FC = (props) => {
  const dispatch = useDispatch();
  const navState = useSelector((store: RootState) => store.signin);

  return <>{}</>;
};
