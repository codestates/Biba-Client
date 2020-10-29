import React from 'react';
import styled from 'styled-components';
import { BeerProps } from '../../containers/page/HomeContainer';

function WantSomeBeer({
  id,
  name,
  image,
  rate,
  setBeerDetail,
  setAllReviews,
}: BeerProps): JSX.Element {
  return (
    <Item
      id={id}
      key={`wantsomebeer${id}`}
      onClick={(e) => {
        setBeerDetail(e);
        setAllReviews(e);
      }}
    >
      <Sub>
        <Image className='image' src={image} alt={name} />
        <Name className='name'>{name}</Name>
      </Sub>
    </Item>
  );
}

const Item = styled.div`
  float: left;
  padding-top: 20px;
  height: 200px;
  width: 150px;
  border-radius: 8px;
  // &:hover .name {
  //   animation: fadein 1s;
  //   color: white;
  //   @keyframes fadein {
  //     from {
  //       opacity: 0;
  //     }
  //     to {
  //       opacity: 1;
  //     }
  //   }
`;

const Sub = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: black;
  overflow: hidden;
`;

const Name = styled.div`
  text-align: center;
  font-size: 14px;
  width: 100%;
  height: 50px;
  ov
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

const Image = styled.img`
  height: 60%;
  width: 40%;
  margin-bottom: 20px;
  &:hover {
    transition: all ease 1s;
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

export default WantSomeBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
