import { combineReducers } from 'redux';

import {
  loginReducer,
  profileReducer,
  myReviewsReducer,
  confirmEmailReducer,
  confirmNicknameReducer,
} from './user';
import { modalReducer, btnColorReducer, navDisplayReducer } from './nav';
import {
  todayBeerReducer,
  wantBeerReducer,
  favoriteBeerReducer,
  reviewBeerReducer,
} from './getbeers';
import { changePageReducer } from './changepage';
import { searchBeerReducer } from './searchbeer';
import { beerDetailReducer } from './beerdetail';
import { myBeerReducer } from './mybeer';

export const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  myReviews: myReviewsReducer,
  confirmEmail: confirmEmailReducer,
  confirmNickname: confirmNicknameReducer,
  modal: modalReducer,
  btnColor: btnColorReducer,
  navDisplay: navDisplayReducer,
  todayBeer: todayBeerReducer,
  wantBeer: wantBeerReducer,
  changePage: changePageReducer,
  favoriteBeer: favoriteBeerReducer,
  reviewBeer: reviewBeerReducer,
  searchBeer: searchBeerReducer,
  beerDetail: beerDetailReducer,
  myBeer: myBeerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
