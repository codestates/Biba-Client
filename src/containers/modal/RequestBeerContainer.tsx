import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import { MDRequestBeer } from '../../components/modal/RequestBeer';
import { RootState } from '../../modules';
import { ModalContentProps } from './ModalContainer';

export interface MDRequestBeerProps {
  request1: boolean;
  request2: boolean;
  inputValues: {
    beerName: string;
    beerRequest: string;
  };
  handleRequestOnChange(
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ): void;
  handleRadioSelect1(): void;
  handleRadioSelect2(): void;
  handleClickSubmitRequest(): void;
}

export const MDRequestBeerContainer = ({
  userData,
  isLogin,
  token,
  handleModal,
  closeModal,
}: ModalContentProps): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    beerName: '',
    beerRequest: '',
  });
  const handleRequestOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const { request1, request2 } = useSelector(
    (state: RootState) => state.beerRequest,
  );
  const dispatch = useDispatch();

  const handleRequestType = (request1: boolean, request2: boolean): void => {
    dispatch({ type: 'SET_REQUESTTYPE', request1, request2 });
  };
  const handleRadioSelect1 = (): void => {
    handleRequestType(true, false);
  };
  const handleRadioSelect2 = (): void => {
    handleRequestType(false, true);
  };
  const handleClickSubmitRequest = (): void => {
    // console.log(inputValues, request1, request2);
    if (inputValues.beerName !== '' && inputValues.beerRequest !== '') {
      if (request1) {
        axios
          .post(`https://beer4.xyz/report/recommend`, {
            token: token,
            comment: inputValues.beerRequest,
            beer_name: inputValues.beerName,
          })
          .then((res) => {
            if (res.status === 201) {
              setInputValues({ ...inputValues, beerName: '', beerRequest: '' });
              alert(`맥주 추천이 완료되었습니다. Biba!`);
              return closeModal();
            } else {
              alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
              return closeModal();
            }
          })
          .catch(() => {
            alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
            return closeModal();
          });
      } else if (request2) {
        axios
          .post(`https://beer4.xyz/report/request`, {
            token: token,
            comment: inputValues.beerRequest,
            beer_name: inputValues.beerName,
          })
          .then((res) => {
            if (res.status === 201) {
              setInputValues({ ...inputValues, beerName: '', beerRequest: '' });
              alert(`맥주 요청이 완료되었습니다. Biba!`);
              return closeModal();
            } else {
              alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
              return closeModal();
            }
          })
          .catch(() => {
            return alert(`오류가 발생했습니다. 잠시 후에 다시 시도해주세요.`);
          });
      }
    }
    if (inputValues.beerName === '') {
      return alert(`맥주 이름을 작성해주세요.`);
    } else if (inputValues.beerRequest === '') {
      return alert(`내용을 작성해주세요.`);
    }
  };

  return (
    <MDRequestBeer
      request1={request1}
      request2={request2}
      inputValues={inputValues}
      handleRequestOnChange={handleRequestOnChange}
      handleRadioSelect1={handleRadioSelect1}
      handleRadioSelect2={handleRadioSelect2}
      handleClickSubmitRequest={handleClickSubmitRequest}
    />
  );
};
