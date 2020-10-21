import React from 'react';
import styled from 'styled-components';

export interface BeerProps {
  key: number;
  name: string;
  image: string;
  rate: number;
}

function RequsetBeer(): JSX.Element {
  return (
    <Request>
      <Box>
        <h3>입력하신 맥주를 찾을 수 없습니다.</h3>
        <button>맥주 등록 요청</button>
      </Box>
    </Request>
  );
}

const Request = styled.div`
  display: grid;
  place-items: center;
`;

const Box = styled.div`
  width: 200px;
  height: 150px;
  border: 1px solid gray;
  border-radius: 1em;
`;

export default RequsetBeer;

// 가운데 정렬 css
//부모 태그
//position: relative;

// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
