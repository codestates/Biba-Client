import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import loadingbeer from '../../lotties/loadingbeer.json';
import { usePromiseTracker } from 'react-promise-tracker';

function LoadingAnimation(): JSX.Element {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingbeer,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { promiseInProgress } = usePromiseTracker({ delay: 1000 });

  return (
    <>
      {promiseInProgress === true ? (
        <Wrap>
          <Loading>
            <Lottie options={defaultOptions} height='90%' width='90%' />
          </Loading>
        </Wrap>
      ) : null}
    </>
  );
}

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  opacity: 0.6;
  z-index: 99;
`;

const Loading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: black;
  border-radius: 50%;
  width: 13.5vw;
  height: 13.5vw;
`;

export default LoadingAnimation;
