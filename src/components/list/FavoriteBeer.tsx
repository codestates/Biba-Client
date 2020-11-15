import React from 'react';
import styled from 'styled-components';
import { BeerProps } from '../../containers/page/HomeContainer';
import { mainGrey } from '../../components/nav/color';

function FavoriteBeer({
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
      onClick={(e) => {
        setBeerDetail(e);
        setAllReviews(e);
      }}
    >
      <ImageWrap>
        <Image className='image' src={image} alt={name} />
      </ImageWrap>
      <Name className='name'>{name}</Name>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: left;
  height: 200px;
  width: 150px;
  border-radius: 8px;
  box-shadow: 3px 3px 3px rgba(238, 238, 238, 0.8);
  color: ${mainGrey};
  font-weight: 500;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  height: 77%;
  width: 100%;

  overflow: hidden;
`;
const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88%;
  padding: 0.5em 0 0.1em 0;
  &:hover {
    transition: all ease 1s;
    transform: translateY(-5px);
    cursor: pointer;
  }
`;
const Name = styled.div`
  text-align: center;
  font-size: 14px;
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export default FavoriteBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
