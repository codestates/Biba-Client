import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../modules';
import { Nav } from '../../components/nav/Nav';
import { Mypage } from '../../components/user/Mypage';

export interface MypageProps {
  test: string;
}

const MypageContainer = (): JSX.Element => {
  return (
    <div>
      <Mypage />
    </div>
  );
};

export const MypageContainerWithRouter = withRouter(MypageContainer);
