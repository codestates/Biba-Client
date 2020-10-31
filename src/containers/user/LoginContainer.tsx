import React, { KeyboardEventHandler, SyntheticEvent, useState } from 'react';
import { RouterProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Login } from '../../components/user/Login';
import { RootState } from '../../modules';
import { User, UserState, UserProfile } from '../../modules/user';
import { ContentType } from '../../modules/nav';
import {
  aReview,
  beerDetailInit,
  compareBeerInit,
  IBeerDetail,
  setBeerDetail,
} from '../../modules/beerdetail';
import { checkStarScore } from '../page/pageUtils';
import { DefaultProps, IBeerDetailWithAll } from '../page/HomeContainer';

export interface LoginResponse extends UserState, UserProfile {}
export interface LoginProps {
  inputValues: {
    email: string;
    password: string;
  };
  handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleLogin(): void;
  pressEnter(e: React.KeyboardEvent<HTMLInputElement>): void;
  redirectToSignup(): void;
}

export const LoginContainer = (props: DefaultProps): JSX.Element => {
  const { userData, token } = useSelector((state: RootState) => state.login);
  const modalState = useSelector((state: RootState) => state.modal);
  const { disBasic, disStory, disMore } = useSelector(
    (state: RootState) => state.infoDisplay,
  );
  const dispatch = useDispatch();
  const setLogin = (userData: User, isLogin: boolean, token: string) => {
    dispatch({ type: 'SET_LOGINSTATE', userData, isLogin, token });
  };
  const setProfile = (profile: string) => {
    dispatch({ type: 'SET_PROFILE', profile });
  };
  const handleModalClose = (
    contentType: ContentType,
    display: boolean,
  ): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };
  const closeModal = (): void => {
    handleModalClose(ContentType.Empty, false);
  };

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleLogin = (): void => {
    axios
      .post<LoginResponse>(
        `https://beer4.xyz/users/login`,
        {
          email: inputValues.email,
          password: String(inputValues.password),
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status === 200) {
          const { id, nickname, email } = res.data.userData;
          const { token, profile } = res.data;
          console.log(res.headers);
          // 받은 데이터로 store 상태 업데이트
          setLogin({ id: id, nickname: nickname, email: email }, true, token);
          setProfile(profile);
          setInputValues({ ...inputValues, email: '', password: '' });
          closeModal();
          if (modalState.contentType !== ContentType.Login) {
            return props.history.push('/');
          }
          if (props.location.pathname.split('/')[1] === 'beer') {
            dispatch({
              type: 'SET_BEERDETAIL',
              beerDetail: beerDetailInit.beerDetail,
            });
            axios
              .post<IBeerDetailWithAll>(
                `https://beer4.xyz/beer/${
                  props.location.pathname.split('/')[2]
                }`,
                {
                  user_id: id,
                  beer_id: props.location.pathname.split('/')[2],
                },
              )
              .then((res) => {
                console.log(res.data);
                const beerDetail: IBeerDetail = res.data;
                dispatch({ type: 'SET_BEERDETAIL', beerDetail: beerDetail }); // store에 detail 전달
                const { bookmark } = res.data;
                dispatch({ type: 'SET_BOOKMARK', bookmark: bookmark });
                const {
                  user_review,
                  user_star,
                  user_input,
                  user_rate,
                } = res.data;
                dispatch({
                  type: 'SET_USERREVIEW',
                  user_review,
                  user_star,
                  user_input,
                  user_rate,
                });
                const {
                  sparkling,
                  sweet,
                  bitter,
                  accessibility,
                  body,
                } = res.data;
                dispatch({
                  type: 'SET_GRAPHDATA',
                  sparkling,
                  sweet,
                  bitter,
                  accessibility,
                  body,
                });
                const { a, b, c, d, e } = checkStarScore(user_rate); // 별점 dispatch 준비 함수, boolean 객체 돌려줌
                dispatch({ type: 'SET_STARSTATUS', a, b, c, d, e }); // 최초 진입 시 내가 준 별점 store에 저장

                const { explain, story } = res.data; // ex 있고 story가 없는데
                if (explain === '') {
                  dispatch({
                    type: 'SET_INFODISPLAY',
                    disBasic: false,
                    disStory: disStory,
                    disMore: disMore,
                  });
                  story !== ''
                    ? dispatch({
                        type: 'SET_INFOSTATUS',
                        tabBasic: false,
                        tabStory: true,
                        tabMore: false,
                      })
                    : dispatch({
                        type: 'SET_INFOSTATUS',
                        tabBasic: false,
                        tabStory: false,
                        tabMore: true,
                      });
                }
                if (story === '') {
                  dispatch({
                    type: 'SET_INFODISPLAY',
                    disBasic: disBasic,
                    disStory: false,
                    disMore: disMore,
                  });
                }
              });
          }
        }
      })
      .catch(() => {
        alert('입력한 정보를 다시 한번 확인해주세요.');
      });
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleLogin();
  };
  const redirectToSignup = (): void => {
    closeModal();
    props.history.push('/signup');
  };

  return (
    <Login
      inputValues={inputValues}
      handleOnChange={handleOnChange}
      handleLogin={handleLogin}
      pressEnter={pressEnter}
      redirectToSignup={redirectToSignup}
    />
  );
};

export const LoginContainerWithRouter = withRouter(LoginContainer);
