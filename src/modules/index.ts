import { combineReducers } from 'redux';

import {
  loginReducer,
  profileReducer,
  myReviewsReducer,
  confirmEmailReducer,
  confirmNicknameReducer,
  confirmAgeReducer,
} from './user';
import { modalReducer, btnColorReducer, navDisplayReducer } from './nav';
import { getBeerReducer } from './getbeer';
import { changePageReducer } from './changepage';
import { searchBeerReducer } from './searchbeer';
import {
  beerDetailReducer,
  bookmarkReducer,
  userReviewReducer,
  allReviewsReducer,
  infoStatusReducer,
  starStatusReducer,
} from './beerdetail';

export const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  myReviews: myReviewsReducer,
  confirmEmail: confirmEmailReducer,
  confirmNickname: confirmNicknameReducer,
  confirmAge: confirmAgeReducer,
  modal: modalReducer,
  btnColor: btnColorReducer,
  navDisplay: navDisplayReducer,
  getBeer: getBeerReducer,
  changePage: changePageReducer,
  searchBeer: searchBeerReducer,
  beerDetail: beerDetailReducer,
  bookmark: bookmarkReducer,
  userReview: userReviewReducer,
  allReview: allReviewsReducer,
  infoStatus: infoStatusReducer,
  starStatus: starStatusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
