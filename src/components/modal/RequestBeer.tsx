import React from 'react';
import styled from 'styled-components';

import { MDRequestBeerProps } from '../../containers/modal/RequestBeerContainer';
import { Radio, RadioOption } from '../../containers/modal/ModalContainer';

import {
  mainYellow,
  mainYellowOpac,
  mainGrey,
  mainGreyOpac,
  accent,
  lightGrey3,
} from '../../components/nav/color';

export const MDRequestBeer = ({
  request1,
  request2,
  inputValues,
  handleRequestOnChange,
  handleRadioSelect1,
  handleRadioSelect2,
  handleClickSubmitRequest,
  bottomModal,
}: MDRequestBeerProps): JSX.Element => {
  return (
    <RequestBeerModal className='requestBeerModal'>
      <RadioArea className='radioArea'>
        <RadioWrap className='radioWrap'>
          <Radio
            id='request1'
            type='radio'
            name='requestBeer'
            value='마셔본 맥주 추천'
            checked={request1}
            onChange={handleRadioSelect1}
          />
          <RadioOption onClick={handleRadioSelect1}>
            마셔본 맥주 추천
          </RadioOption>
        </RadioWrap>
        <RadioWrap className='radioWrap'>
          <Radio
            id='request2'
            type='radio'
            name='requestBeer'
            value='이 맥주가 궁금해요'
            checked={request2}
            onChange={handleRadioSelect2}
          />
          <RadioOption onClick={handleRadioSelect2}>
            이 맥주가 궁금해요
          </RadioOption>
        </RadioWrap>
      </RadioArea>
      <RequestTitleArea className='requestTitleArea'>
        <Subtitle className='subtitle'>맥주 이름</Subtitle>
        <RequestTitle
          name='beerName'
          defaultValue={inputValues.beerName}
          onChange={handleRequestOnChange}
          placeholder='맥주 이름을 작성해주세요.'
        />
      </RequestTitleArea>
      <RequestBodyArea className='requestBodyArea'>
        <Subtitle className='subtitle'>내용</Subtitle>
        <RequestBody
          name='beerRequest'
          defaultValue={inputValues.beerRequest}
          onChange={handleRequestOnChange}
          maxLength={100}
          rows={bottomModal ? 5 : 4}
          placeholder='내용을 작성해주세요.'
          wrap='hard'
        />
      </RequestBodyArea>
      <RequestSubmitBtn onClick={handleClickSubmitRequest}>
        요청하기
      </RequestSubmitBtn>
    </RequestBeerModal>
  );
};

const RequestBeerModal = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;
`;

const RadioArea = styled.div`
  display: flex;
  margin: 0 0 0.1em 0;
`;

const RadioWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin: 0 1em 0 0;
  @media (max-width: 425px) {
    margin: 0.2em 1em 0 0;
  }
`;

const RequestTitleArea = styled.div`
  display: grid;
  grid-template-columns: 5em auto;

  margin: 0.8em 0 0.5em 0;
`;

const Subtitle = styled.div`
  grid-column: 1 / 2;

  display: flex;
  align-self: center;

  margin: 0 0 0.1em 0;
  font-size: 0.95em;
`;
const RequestTitle = styled.input`
  grid-column: 2 / 3;

  display: flex;
  width: 60%;
  height: auto;
  border: 2px solid ${mainYellow};
  border-radius: 8px;
  padding: 0.5em 0.4em 0.4em 0.4em;

  font-size: 0.95em;
  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    border: 2px solid ${mainYellowOpac};
  }
`;

const RequestBodyArea = styled.div`
  display: grid;
  grid-template-columns: 5em auto;
`;
const RequestBody = styled.textarea`
  grid-column: 2 / 3;
  resize: none;

  width: 95%;
  border: 2px solid ${mainYellow};
  border-radius: 8px;

  padding: 0.5em 0.4em 0.5em 0.4em;
  line-height: 1.5;
  font-size: 0.95em;

  &:focus {
    outline: none;
  }
  @media (max-width: 425px) {
    border: 2px solid ${mainYellowOpac};
  }
`;

const RequestSubmitBtn = styled.button`
  cursor: pointer;

  display: flex;
  align-self: flex-end;

  border: 0px;
  border-radius: 8px;

  margin: 0.5em 1.2em 0 0;
  padding: 0.4em 0.6em 0.35em 0.6em;

  background-color: ${mainYellow};
  color: #fff;
  &:hover {
    background-color: ${mainGrey};
    color: white;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: flex;
  }
  @media (max-width: 425px) {
    margin: 0.55em 0.9em 0 0;
    padding: 0.45em 0.7em 0.4em 0.7em;
  }
`;
