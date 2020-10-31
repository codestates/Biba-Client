import React from 'react';
import styled from 'styled-components';
import { FaCopyright } from 'react-icons/fa';
import { BiBeer } from 'react-icons/bi';

import {
  mainGrey,
  mainGreyOpac,
  mainYellow,
  lightGrey1,
  lightGrey2,
  mainYellowOpac,
} from '../../components/nav/color';

export const Footer = (): JSX.Element => {
  return (
    <Container>
      <FooterArea>
        <About>
          <AboutText>
            Biba <Beer /> What are you drinking?
          </AboutText>
          <AboutText>
            - Jimyeong Song, Yeon Yoon, Jiwook Kim, Jaehyun Min
          </AboutText>
          <AboutText2>
            <CopyRight /> 2020. Non-Alcohol all rights reserved.
          </AboutText2>
        </About>
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
  align-items: flex-start;
  justify-items: flex-start;

  width: 100%;
  padding: 0.3em;
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
`;
const AboutText2 = styled(AboutText)`
  font-size: 0.8em;
  margin: 0.7em 0 0 0;
`;
const Beer = styled(BiBeer)`
  width: 1.3em;
  height: 1.3em;
  margin: 0em 0.2em 0 0;
  color: ${mainYellowOpac};
`;

const CopyRight = styled(FaCopyright)`
  width: 1.3em;
  height: 1.3em;
  margin: 0em 0.2em 0 0;
  color: ${mainYellowOpac};
`;
