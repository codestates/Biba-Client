import React from 'react';
import styled from 'styled-components';

import { MDMyBeerListProps } from '../../containers/modal/MyBeerListContainer';
import { Radio, RadioOption } from '../../containers/modal/ModalContainer';

import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  accent,
  lightGrey3,
} from '../../components/nav/color';

export const MDMyBeerList = ({
  myBeerListImg,
  option1,
  option2,
  handleRadioOption1,
  handleRadioOption2,
  mapOption1,
  mapOption2,
  setSelectedBeerId,
  handleSelectBeer,
  handleClickBeerSelect,
}: MDMyBeerListProps): JSX.Element => {
  return (
    <MyBeerListModal>
      <MyBeerListImgDiv>
        <MyBeerListImg ref={myBeerListImg} />
      </MyBeerListImgDiv>
      <MyBeerListSelect>
        <BLRadioWrap>
          <BLRadio>
            <Radio
              id='option1'
              type='radio'
              name='myBeerType'
              value='즐겨찾기에 추가한 맥주'
              checked={option1}
              onChange={() => handleRadioOption1()}
            />
            <RadioOption onClick={handleRadioOption1}>
              즐겨찾는 맥주
            </RadioOption>
          </BLRadio>
          <BLRadio>
            <Radio
              id='option2'
              type='radio'
              name='myBeerType'
              value='리뷰를 남긴 맥주'
              checked={option2}
              onChange={() => handleRadioOption2()}
            />
            <RadioOption onClick={handleRadioOption2}>리뷰한 맥주</RadioOption>
          </BLRadio>
        </BLRadioWrap>
        <SelectWrap>
          <SelectBeer
            name='selectBeerName'
            onChange={(e) => {
              const targetId =
                e.target.options[e.target.options.selectedIndex].id;
              setSelectedBeerId(Number(targetId));
              handleSelectBeer(e, option1);
            }}
          >
            <DefaultOption key='optionDefault' className='default'>
              맥주 이름 선택
            </DefaultOption>
            {option1 ? mapOption1 : mapOption2}
          </SelectBeer>
          <CompareBtn onClick={handleClickBeerSelect}>Biba!</CompareBtn>
        </SelectWrap>
      </MyBeerListSelect>
    </MyBeerListModal>
  );
};

const MyBeerListModal = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 95%;
`;
const MyBeerListImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;

  border: 2px solid ${mainYellowOpac};
  border-radius: 16px;
  overflow: hidden;

  margin: 0 1em 0 0;
`;
const MyBeerListImg = styled.img`
  display: flex;

  height: 150px;
`;

const MyBeerListSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const BLRadioWrap = styled.div`
  display: flex;
  align-items: center;

  margin: 0.7em 0 0 0;
`;
const BLRadio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 0.3em 0.2em 0;
`;

const SelectWrap = styled.div`
  display: flex;
  align-items: center;

  margin: 0.5em 0 0 0;
`;
const SelectBeer = styled.select`
  display: flex;

  width: 12em;
  max-width: 12em;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border: 0;
  border-bottom: 2px solid ${mainYellowOpac};
  border-radius: 0;

  margin: 0.5em 0 0 0;
  padding: 0 0 0.2em 0;

  color: ${mainGrey};
  &:focus,
  &:active {
    outline: none;
    border-bottom-color: ${mainYellow};
  }
`;

const DefaultOption = styled.option``;
const CompareBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-self: center;

  border: 0px;
  border-radius: 8px;

  margin: 0.15em 0 0 0.6em;
  padding: 0.4em 0.8em 0.35em 0.8em;

  font-size: 1.1em;
  letter-spacing: 0.1em;

  background-color: ${mainYellow};
  color: #fff;

  &: hover {
    background-color: ${accent};
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
