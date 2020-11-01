import { combineReducers } from 'redux';

import {
  loginReducer,
  profileReducer,
  myReviewsReducer,
  confirmEmailReducer,
  confirmNicknameReducer,
  confirmAgeReducer,
  refDisplayReducer,
} from './user';
import {
  searchbarReducer,
  modalReducer,
  navDisplayReducer,
  beerRequestReducer,
  searchBeerReducer,
  myBeerListTypeReducer,
  selectedBeerReducer,
  visitCountReducer,
} from './nav';
import {
  todayBeerReducer,
  wantBeerReducer,
  favoriteBeerReducer,
  reviewBeerReducer,
} from './getbeers';
import { changePageReducer } from './changepage';

import {
  beerDetailReducer,
  compareBeerReducer,
  bookmarkReducer,
  graphDataReducer,
  compareDataReducer,
  userReviewReducer,
  allReviewsReducer,
  infoDisplayReducer,
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
  refDisplay: refDisplayReducer,
  searchbar: searchbarReducer,
  modal: modalReducer,
  navDisplay: navDisplayReducer,
  beerRequest: beerRequestReducer,
  todayBeer: todayBeerReducer,
  wantBeer: wantBeerReducer,
  changePage: changePageReducer,
  favoriteBeer: favoriteBeerReducer,
  reviewBeer: reviewBeerReducer,
  searchBeer: searchBeerReducer,
  myBeerListType: myBeerListTypeReducer,
  selectedBeer: selectedBeerReducer,
  visitCount: visitCountReducer,
  beerDetail: beerDetailReducer,
  compareBeer: compareBeerReducer,
  bookmark: bookmarkReducer,
  graphData: graphDataReducer,
  compareData: compareDataReducer,
  userReview: userReviewReducer,
  allReviews: allReviewsReducer,
  infoDisplay: infoDisplayReducer,
  infoStatus: infoStatusReducer,
  starStatus: starStatusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
