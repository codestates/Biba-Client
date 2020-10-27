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
  searchbarReducer,
  modalReducer,
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
  graphDataReducer,
  userReviewReducer,
  allReviewsReducer,
  infoDisplayReducer,
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
  searchbar: searchbarReducer,
  modal: modalReducer,
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
  graphData: graphDataReducer,
  userReview: userReviewReducer,
  allReviews: allReviewsReducer,
  infoDisplay: infoDisplayReducer,
  infoStatus: infoStatusReducer,
  starStatus: starStatusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
