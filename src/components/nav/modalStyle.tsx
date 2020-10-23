import styled from 'styled-components';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';

export const mainYellow = '#ffad13';
export const mainYellowOpac = 'rgba(255, 173, 19, 0.5)';
export const mainGrey = '#323232';
export const mainGreyOpac = 'rgba(50, 50, 50, 0.8)';

export const lightGrey1 = 'rgb(250, 250, 250)';
export const lightGrey2 = 'rgb(241, 241, 241)';

// const btnOff = 'rgba(50, 50, 50, 0.3)';
// const btnOff = '#dddddd';
export const btnOff = '#161616';
export const btnOffText = 'rgb(241, 241, 241)';

export const pDefault = '#161616';
// 색 정의

export const SingleComment = styled.div`
  // ModalSingleComment 참고 at ModalContainer
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 23%;
  min-width: 180px;
  min-height: 120px;

  border: 2px solid ${mainYellow};
  border-radius: 8px;

  margin: 0.5em 0.8em 1em 0;
  padding: 0.6em;
`; // 하나의 코멘트 wrap

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const UserWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin: 0 0 0.4em 0;
`;
export const Profile = styled.img`
  display: flex;
  width: 1.5em;
  height: 1.5em;

  margin: 0 0.3em 0 0;
`;
export const PIcon = styled(BiUserCircle)`
  display: flex;

  width: 1.5em;
  height: 1.5em;

  margin: 0 0.3em 0 0;
  color: ${mainGrey};
`;
export const Nickname = styled.div`
  display: flex;

  padding: 0.2em 0 0 0;

  font-size: 0.95em;
`;

export const RateWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  align-self: flex-end;
`;
export const URStar = styled(FaStar)`
  display: flex;

  margin: 0 0.25em 0 0;
  color: ${mainYellow};
`;
export const UserRate = styled.div`
  display: flex;

  padding: 0.1em 0.2em 0 0;
`;

export const Comment = styled.div`
  display: flex;

  margin: 0 0 0 0.2em;
  font-size: 0.9em;
`;

// beerdetail container, modal container
