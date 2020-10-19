import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { LoginContainerWithRouter } from '../../containers/user/Login';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { Modal } from '../../components/nav/Modal';
import { nicknameCheck } from '../user/utils';

export interface ModalProps {
  display: boolean;
  content: JSX.Element | JSX.Element[];
  closeModal(): void;
}

export const ModalContainer = (props: RouterProps): JSX.Element => {
  // modal이 필요한 각 페이지에서 상황에 맞게 dispatch
  // 1. modal display -> true, false 지정
  // 2. 어떤 콘텐츠가 나와야하는지에 따라 ContentType 지정
  const { contentType, display } = useSelector(
    (state: RootState) => state.modal,
  );
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const nicknameConfirm = useSelector(
    (state: RootState) => state.confirmNickname.value,
  );

  const { myReviews } = useSelector((state: RootState) => state.myReviews);
  const dispatch = useDispatch();
  const handleConfirmNickname = (value: boolean): void => {
    dispatch({ type: 'CONFIRM_NICKNAME', value });
  };

  const [inputValues, setInputValues] = useState({
    nickname: '',
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (nicknameConfirm) {
      handleConfirmNickname(false);
    }
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleCheckNickname = (): void => {
    if (inputValues.nickname !== '') {
      if (nicknameCheck(inputValues.nickname)) {
        axios
          .post('http://localhost:4000/users/nicknameconfirm', {
            nickname: inputValues.nickname,
          })
          .then((res) => {
            if (res.status === 200) alert(`사용할 수 있는 닉네임입니다.`);
            // 중복 확인 버튼 변화 && confirm dispatch
            handleConfirmNickname(true);
          })
          .catch(() => {
            alert(`이미 존재하는 닉네임입니다.\n다른 닉네임을 사용해주세요.`);
          });
      } else {
        alert(
          `닉네임을 확인해주세요.\n6~12자리의 영문, 숫자 조합이어야 합니다.`,
        );
      }
    } else {
      alert(`닉네임을 입력해주세요.`);
    }
  };

  const handleClickChangeNickname = (): void => {
    const { nickname } = inputValues;
    nicknameCheck(nickname);
    console.log('nickname change test');
    if (nicknameConfirm) {
      // true라면 post 요청(변경 요청 전송)
    }
  };

  const content = (contentType: ContentType): JSX.Element | JSX.Element[] => {
    // 이 함수의 결과가 component의 Modals로 넘어감
    if (contentType === ContentType.Empty) {
      return <></>;
    }
    if (contentType === ContentType.Login) {
      return <LoginContainerWithRouter />;
    }
    if (contentType === ContentType.MypageAllReviews) {
      return myReviews.length !== 0 ? (
        myReviews.map((ele: { message: string }) => (
          <div key={myReviews.indexOf(ele)}>{ele.message}</div>
        ))
      ) : (
        <div>작성한 리뷰가 없습니다.</div>
      );
    }
    if (contentType === ContentType.ChangeNickname) {
      return (
        <>
          <div>사용 중인 닉네임: {userData.nickname}</div>
          <div>새로운 닉네임을 입력해주세요.</div>
          <div>
            <input
              type='text'
              name='nickname'
              onChange={handleOnChange}
            ></input>
            <button onClick={handleCheckNickname}>중복 확인</button>
          </div>
          <button onClick={handleClickChangeNickname}>변경하기</button>
        </>
      );
    }

    return <div>error</div>;
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

  return (
    <Modal
      display={display}
      content={content(contentType)}
      closeModal={closeModal}
    />
  );
};

export const ModalContainerWithRouter = withRouter(ModalContainer);