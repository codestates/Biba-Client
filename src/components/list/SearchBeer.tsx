import React from 'react';
import styled from 'styled-components';
import { EStar } from '../../components/page/BeerDetail';

export interface BeerProps {
  key: number;
  name: string;
  image: string;
  rate: number;
}

function SearchBeer({ name, image, rate }: BeerProps): JSX.Element {
  const createStar = (rate: number): number[] => {
    const arr = [];
    for (let i = 0; i < rate; i++) {
      arr.push(i + 1);
    }
    return arr;
  };
  const stars = createStar(rate);
  return (
    <BeerImage>
      <Top>
        <Image src={image} alt={name} />
      </Top>
      <Middle>
        <Text>{name}</Text>
      </Middle>
      <Bottom>
        {stars.map((index) => (
          <EStar key={stars[index]} />
        ))}
      </Bottom>
    </BeerImage>
  );
}

const BeerImage = styled.div`
  height: 25vh;
  width: 12vw;
  text-align: center;
  background-color: lightgray;
  border-radius: 1em;
  margin: 1em auto;
  padding: 1em;
  color: lightgray;
  &:hover {
    animation: fadein 1s;
    color: white;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Top = styled.div`
  height: 60%;
  &:hover {
    transition: all ease 1s;
    transform: translateY(-40px);
  }
`;
const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 30%;
`;
const Bottom = styled.div`
  height: 10%;
`;

const Text = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  transform: translateY(10px);
  z-index: -1;
`;

const Image = styled.img`
  height: 100%;
  width: 50%;
  transform: translateY(40px);
`;

const StarWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export default SearchBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
