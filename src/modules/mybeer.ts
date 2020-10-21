export const FAVORITE = 'FAVORITE';
export const REVIEW = 'REVIEW';

export interface Favorite {
  type: typeof FAVORITE;
}

export interface Review {
  type: typeof REVIEW;
}

export type MyBeerDispatchTypes = Favorite | Review;

export interface MybeerStateI {
  isFavorite: boolean;
  isReview: boolean;
}

const defaultMybeer: MybeerStateI = {
  isFavorite: true,
  isReview: false,
};

export const changeFavoriteAction = (): Favorite => {
  return {
    type: FAVORITE,
  };
};

export const changeReviewAction = (): Review => {
  return {
    type: REVIEW,
  };
};

export const myBeerReducer = (
  state: MybeerStateI = defaultMybeer,
  action: MyBeerDispatchTypes,
): MybeerStateI => {
  switch (action.type) {
    case FAVORITE:
      return {
        isFavorite: true,
        isReview: false,
      };
    case REVIEW:
      return {
        isFavorite: false,
        isReview: true,
      };

    default:
      return state;
  }
};
