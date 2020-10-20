import React from 'react';
import styled from 'styled-components';

export interface BeerProps {
  key: number;
  name: string;
  image: string;
  rate: number;
}

const numToStar = (rate: number) => {
  let result = '';
  for (let i = 0; i < rate; i++) {
    result += '⭐ ';
  }
  return result;
};

function SearchBeer({ name, image, rate }: BeerProps): JSX.Element {
  const star = numToStar(rate);
  return (
    <BeerImage>
      <Image src={image} alt={name} />
      <TextContainer>
        <Text>{name}</Text>
        <Text>{star}</Text>
      </TextContainer>
    </BeerImage>
  );
}

const BeerImage = styled.div`
  height: 30vh;
  width: 12vw;
  text-align: center;
  border: 1px solid gray;
  border-radius: 1em;
  margin: 1em auto;
  padding: 1em;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`;

const Image = styled.img`
  height: 80%;
  width: 50%;
`;

export default SearchBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
