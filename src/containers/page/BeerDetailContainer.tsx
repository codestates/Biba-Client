import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import { RootState } from '../../modules';
import { ContentType } from '../../modules/nav'; // Empty, Login, MypageAllReviews
import { starStatusInit } from '../../modules/beerdetail';
import { BeerDetail } from '../../components/page/BeerDetail';
import { Bookmark, IBeerDetail, aReview } from '../../modules/beerdetail';
import { DefaultProps } from '../../containers/page/HomeContainer';
import { checkStarScore } from './pageUtils';

export interface BeerDetailProps extends DefaultProps {
  beerDetail: IBeerDetail;
  bookmark: boolean;
  handleBookmark(): void;
  story: boolean;
  more: boolean;
  handleInfoTab(e: React.MouseEvent<HTMLElement>): void;
  handleStar(): JSX.Element[];
  handleClickAllReviews(): void;
}

const BeerDetailContainer = ({
  match,
  history,
  location,
}: DefaultProps): JSX.Element => {
  const { userData, isLogin, token } = useSelector(
    (state: RootState) => state.login,
  );
  const { beerDetail } = useSelector((state: RootState) => state.beerDetail);
  const { bookmark } = useSelector((state: RootState) => state.bookmark);
  const { review, star, starScore } = useSelector(
    (state: RootState) => state.userReview,
  );
  const { story, more } = useSelector((state: RootState) => state.infoStatus);
  const { a, b, c, d, e } = useSelector((state: RootState) => state.starStatus);
  const currentStatus = [a, b, c, d, e];

  // 이하 함수는 리스트 페이지에 작성 -> 특정 맥주 클릭 시 get 요청 -> 스토어에 정보 들어감
  const dispatch = useDispatch();
  const handleModal = (contentType: ContentType, display: boolean): void => {
    dispatch({ type: 'SET_MODAL', contentType, display });
  };

  const handleBookmark = (): void => {
    axios
      .post<Bookmark>(`https://beer4.xyz/bookmark/add`, {
        token: token,
        beer_id: beerDetail.id,
      })
      .then((res) => {
        const { bookmark } = res.data; // 추가되었을 경우 true 돌아옴
        if (res.status === 200) {
          dispatch({ type: 'SET_BOOKMARK', bookmark }); // store에 저장된 bookmark 상태 업데이트
          bookmark
            ? alert(`즐겨찾기에 추가되었습니다.`)
            : alert(`즐겨찾기에서 삭제되었습니다.`);
        } else {
          alert(`즐겨찾기 추가에 실패하였습니다.`);
        }
      });
  };
  const handleInfoTab = (e: React.MouseEvent<HTMLElement>): void => {
    console.log('test');
    if (e.currentTarget.id === 'story') {
      const story = true,
        more = false;
      dispatch({ type: 'SET_INFOSTATUS', story, more });
    }
    if (e.currentTarget.id === 'more') {
      const story = false,
        more = true;
      dispatch({ type: 'SET_INFOSTATUS', story, more });
    }
  };
  const handleClickStar = (star: React.MouseEvent<HTMLElement>): void => {
    console.log(star.currentTarget.id);
    if (currentStatus.indexOf(true) !== -1) {
      dispatch({ type: 'SET_STARSTATUS', starStatusInit });
      // axios.post - 서버에 전송, 이때 review status 체크해서 보내야 함
      return;
    }
    const { a, b, c, d, e } = checkStarScore(Number(star.currentTarget.id)); // 별점 dispatch 준비 함수, boolean 객체 돌려줌
    dispatch({ type: 'SET_STARSTATUS', a, b, c, d, e }); // 최초 진입 시 내가 준 별점 store에 저장
    // axios.post - 서버에 전송, 이때 review status 체크해서 보내야 함
  };
  const handleClickAllReviews = (): void => {
    handleModal(ContentType.AllReviews, true);
  };

  const handleStar = (): JSX.Element[] => {
    const stars = [
      [a, 1],
      [b, 2],
      [c, 3],
      [d, 4],
      [e, 5],
    ];
    // onclick시 ele 값 넘기는 함수
    return stars.map((ele) => {
      return (
        <StarWrap
          key={`star${ele[1]}`}
          className='star'
          id={`${ele[1]}`}
          onClick={handleClickStar}
        >
          <FStar style={!ele[0] ? { display: 'block' } : { display: 'none' }} />
          <EStar style={ele[0] ? { display: 'block' } : { display: 'none' }} />
        </StarWrap>
      );
    });
  };

  return (
    <BeerDetail
      match={match}
      history={history}
      location={location}
      beerDetail={beerDetail}
      bookmark={bookmark}
      handleBookmark={handleBookmark}
      story={story}
      more={more}
      handleInfoTab={handleInfoTab}
      handleStar={handleStar}
      handleClickAllReviews={handleClickAllReviews}
    />
  );
};

export const BeerDetailWithRouter = withRouter(BeerDetailContainer);

const StarWrap = styled.div`
  cursor: pointer;
  display: flex;
`;
const FStar = styled(FaRegStar)``;
const EStar = styled(FaStar)``;
