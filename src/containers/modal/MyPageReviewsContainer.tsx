import React from 'react';
import { useSelector } from 'react-redux';

import {
  MDMyPageAllRates,
  MDMyPageAllReviews,
} from '../../components/modal/MyPageReviews';
import { RootState } from '../../modules';

import { ReviewModalContentProps } from './ModalContainer';
import { MyReview } from '../../modules/user';

export interface MDMyPageReviewsProps {
  myReviews: MyReview[];
  setDateForm(input: string): string;
}

export const MDMyPageAllRatesContainer = ({
  setDateForm,
}: ReviewModalContentProps): JSX.Element => {
  const { myReviews } = useSelector((state: RootState) => state.myReviews);

  return <MDMyPageAllRates myReviews={myReviews} setDateForm={setDateForm} />;
};

export const MDMyPageAllReviewsContainer = ({
  setDateForm,
}: ReviewModalContentProps): JSX.Element => {
  const { myReviews } = useSelector((state: RootState) => state.myReviews);

  return <MDMyPageAllReviews myReviews={myReviews} setDateForm={setDateForm} />;
};
