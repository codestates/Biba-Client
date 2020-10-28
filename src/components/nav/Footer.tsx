import React from 'react';
import styled from 'styled-components';

export const Footer = (): JSX.Element => {
  return (
    <Container>
      <FooterArea>
        <About>
          <AboutText>{`Team Non-Alcohol`}</AboutText>
          <AboutText>{`Member`}</AboutText>
          <AboutText>{`CopyRight`}</AboutText>
        </About>
      </FooterArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const FooterArea = styled.div`
  display: flex;
  align-items: flex-start;
  justify-items: flex-start;

  // border: 2px solid #545454;

  width: 100%;
  padding: 0.3em;
`;
const Logo = styled.img`
  width: 30px;
  margin: 0 1em 0 0;
`;
const About = styled.div`
  display: flex;
  flex-direction: column;
`;
const AboutText = styled.p`
  margin: 0;
  padding: 0;

  font-family: 'Lato';
  line-height: 1.3;
  font-weight: 300;
`;
