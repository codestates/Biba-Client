import React from 'react';
import styled from 'styled-components';

import { BeerProps } from '../../containers/page/HomeContainer';

function Review({
  id,
  name,
  image,
  rate,
  setBeerDetail,
  setAllReviews,
}: BeerProps): JSX.Element {
  return (
    <Image
      id={id}
      src={image}
      alt={name}
      onClick={(e) => {
        setBeerDetail(e);
        setAllReviews(e);
      }}
    />
  );
}

const Image = styled.img`
  height: 15vh;
  width: 8vw;
  border: 1px solid gray;
  border-radius: 1em;
  margin-right: 1em;
  &:hover {
    transition: all ease 1s;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export default Review;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
