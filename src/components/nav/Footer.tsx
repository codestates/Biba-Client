import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaCopyright } from 'react-icons/fa';
import { BiBeer } from 'react-icons/bi';
import { FooterProps } from '../../containers/nav/FooterContainer';

import {
  mainGrey,
  mainGreyOpac,
  mainYellow,
  lightGrey1,
  lightGrey2,
  mainYellowOpac,
} from '../../components/nav/color';

export const Footer = ({ count }: FooterProps): JSX.Element => {
  return (
    <Container>
      <FooterArea>
        <About>
          <AboutText>
            Biba v1.0 <Beer /> What are you drinking?
          </AboutText>
          <AboutText>
            - Jimyeong Song, Yeon Yoon, Jiwook Kim, Jaehyun Min
          </AboutText>
          <AboutText2>
            <CopyRight /> 2020. Non-Alcohol all rights reserved.
          </AboutText2>
        </About>
        <Count>
          Total Visit
          <Beer2 /> &nbsp;
          <CountNumber>{count}</CountNumber>
        </Count>
      </FooterArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 0 1.5em;
`;

const FooterArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  width: 100%;
  padding: 0.3em;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const About = styled.div`
  display: flex;
  flex-direction: column;
`;
const AboutText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin: 0;
  padding: 0;

  font-family: 'Lato';
  line-height: 1.5;
  font-weight: 500;
  color: ${mainYellowOpac};
  @media (max-width: 768px) {
    display: none;
  }
`;
const AboutText2 = styled(AboutText)`
  font-size: 0.8em;
  margin: 0.7em 0 0 0;
  @media (max-width: 768px) {
    display: flex;
  }
  @media (max-width: 360px) {
    font-size: 0.7em;
  }
`;
const Beer = styled(BiBeer)`
  width: 1.2em;
  height: 1.2em;
  margin: 0 0.2em 0 0;
  color: ${mainYellowOpac};
`;

const CopyRight = styled(FaCopyright)`
  width: 1.3em;
  height: 1.3em;
  margin: -0.05em 0.2em 0 0;
  color: ${mainYellowOpac};
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Lato';
  font-size: 0.95em;
  color: rgba(50, 50, 50, 0.6);
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;
const Beer2 = styled(BiBeer)`
  width: 1.1em;
  height: 1.1em;
  margin: 0.1em 0 0 0.1em;
  color: rgba(50, 50, 50, 0.6);
`;
const CountNumber = styled.div`
  font-family: 'Noto Sans KR';
  font-size: 1em;
  font-weight: 500;
  margin: 0.21em 0 0 0;
  color: ${mainYellow};
`;
