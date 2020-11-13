import React from 'react';
import { useSelector } from 'react-redux';

import { MDDetailAllReviews } from '../../components/modal/DetailAllReviews';
import { RootState } from '../../modules';

import { ReviewModalContentProps } from './ModalContainer';
import { aReview } from '../../modules/beerdetail';

export interface MDDetailAllReviewsProps {
  allReviews: aReview[];
  setDateForm(input: string): string;
}

export const MDDetailAllReviewsContainer = ({
  setDateForm,
}: ReviewModalContentProps): JSX.Element => {
  const { allReviews } = useSelector((state: RootState) => state.allReviews);

  return (
    <MDDetailAllReviews allReviews={allReviews} setDateForm={setDateForm} />
  );
};
