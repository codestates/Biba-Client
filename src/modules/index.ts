import { combineReducers } from 'redux';

import {
  loginReducer,
  profileReducer,
  myReviewsReducer,
  confirmEmailReducer,
  confirmNicknameReducer,
  confirmAgeReducer,
} from './user';
import {
  modalReducer,
  btnColorReducer,
  navDisplayReducer,
  beerRequestReducer,
} from './nav';
import {
  todayBeerReducer,
  wantBeerReducer,
  favoriteBeerReducer,
  reviewBeerReducer,
} from './getbeers';
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
import { myBeerReducer } from './mybeer';

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
  beerRequest: beerRequestReducer,
  todayBeer: todayBeerReducer,
  wantBeer: wantBeerReducer,
  changePage: changePageReducer,
  myBeer: myBeerReducer,
  favoriteBeer: favoriteBeerReducer,
  reviewBeer: reviewBeerReducer,
  searchBeer: searchBeerReducer,
  beerDetail: beerDetailReducer,
  bookmark: bookmarkReducer,
  userReview: userReviewReducer,
  allReviews: allReviewsReducer,
  infoStatus: infoStatusReducer,
  starStatus: starStatusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
