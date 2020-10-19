import React from 'react';
import styled from 'styled-components';

export const Footer = (): JSX.Element => {
  return (
    <Container>
      <FooterArea>
        <Logo src='fakeLogo.jpg' alt='this is fake logo'></Logo>
        <About>
          <div>{`Team Name`}</div>
          <div>{`Member`}</div>
          <div>{`CopyRight`}</div>
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
  flex-direction: column;
  align-items: flex-start;

  border: 2px solid #545454;

  width: 65em;
  margin: 2em;
  padding: 0.3em;
`;
const Logo = styled.img`
  width: 30px;
`;
const About = styled.div`
  display: flex;
  flex-direction: column;
`;
