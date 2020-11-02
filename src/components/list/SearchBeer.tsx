import React from 'react';
import styled from 'styled-components';
import { FStar } from '../../components/page/BeerDetail';
import { BeerProps } from '../../containers/page/HomeContainer';
import { mainGrey } from '../../components/nav/color';
function SearchBeer({
  id,
  name,
  image,
  rate,
  setBeerDetail,
  setAllReviews,
}: BeerProps): JSX.Element {
  const createStar = (rate: number): number[] => {
    const arr = [];
    for (let i = 0; i < rate; i++) {
      arr.push(i + 1);
    }
    return arr;
  };
  const stars = createStar(rate);
  return (
    <BeerImage
      id={id}
      key={`searchbeer${id}`}
      onClick={(e) => {
        setBeerDetail(e);
        setAllReviews(e);
      }}
    >
      <ImageWrap>
        <Image className='image' src={image} alt={name} />
      </ImageWrap>
      <Middle>
        <Text>{name}</Text>
      </Middle>
      <Bottom>
        {stars.map((index) => (
          // <FStar key={stars[index]} />
          <FStar key={`star${stars.indexOf(index)}`} />
        ))}
      </Bottom>
    </BeerImage>
  );
}

const BeerImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 25vh;
  width: 11vw;
  text-align: center;
  box-shadow: 1px 1px;
  border-radius: 1em;
  margin: 1em auto;
  padding: 1em;
  &:hover {
    animation: fadein 2s;
    cursor: pointer;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  color: ${mainGrey};
  font-weight: 500;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;

  overflow: hidden;
  &:hover {
    transition: all ease 1s;
    transform: translateY(-30px);
  }
  padding: 0.5em 0 0 0;
`;
const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85%;
  padding: 0.3em 0 0.1em 0;
  &:hover {
    transition: all ease 1s;
    transform: translateY(-5px);
    cursor: pointer;
  }
`;
const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const Bottom = styled.div`
  height: 1.5em;
  min-height: 1.5em;
`;

const Text = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  z-index: -1;
  font-size: 14px;
`;

export default SearchBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
