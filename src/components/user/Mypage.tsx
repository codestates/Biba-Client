import { stringify } from 'querystring';
import React from 'react';
import styled from 'styled-components';

import { MypageProps } from '../../containers/user/Mypage';

export const Mypage = ({ userData, profile }: MypageProps): JSX.Element => {
  return (
    <Container>
      <div>{JSON.stringify(userData)}</div>
      <div>{profile}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
