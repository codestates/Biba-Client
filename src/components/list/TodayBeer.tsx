import React from 'react';
import styled from 'styled-components';
import { BeerProps } from '../../containers/page/HomeContainer';
import { mainGrey } from '../../components/nav/color';

const numToStar = (rate: number) => {
  let result = '';
  for (let i = 0; i < rate; i++) {
    result += '⭐ ';
  }
  return result;
};

function TodayBeer({
  id,
  name,
  image,
  rate,
  setBeerDetail,
  setAllReviews,
}: BeerProps): JSX.Element {
  const star = numToStar(rate);
  return (
    <Item
      id={id}
      src={image}
      onClick={(e) => {
        setBeerDetail(e);
        setAllReviews(e);
      }}
    ></Item>
  );
}

const Item = styled.img`
  width: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0.5px 0.5px 0.5px 0.5px lightgray;
  &:hover {
    transition: all ease 1s;
    transform: scale(1.1);
    cursor: pointer;
  }

  @media (max-width: 414px) {
    width: 140px;
    margin-left: 20px;
  }

  @media (max-width: 375px) {
    width: 140px;
    margin-left: 10px;
  }

  @media (max-width: 360px) {
    width: 120px;
    margin-left: 20px;
  }
`;

// const BeerImage = styled.div`
//   height: 30vh;
//   width: 100%;
//   text-align: center;
//   border: 1px solid gray;
//   border-radius: 1em;
//   margin: 1em auto;
//   padding: 1em;
//   &:hover {
//     transition: all ease 1s;
//     transform: scale(1.1);
//     cursor: pointer;
//   }
// `;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${mainGrey};
  font-weight: 500;
`;

const Text = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`;

export default TodayBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
