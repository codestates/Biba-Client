import { combineReducers } from 'redux';

import {
  loginReducer,
  profileReducer,
  myReviewsReducer,
  confirmEmailReducer,
  confirmNicknameReducer,
} from './user';
import { modalReducer, btnColorReducer, navDisplayReducer } from './nav';
import { getBeerReducer } from './getbeer';
import { changePageReducer } from './changepage';
import { beerDetailReducer } from './beerdetail';

export const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  myReviews: myReviewsReducer,
  confirmEmail: confirmEmailReducer,
  confirmNickname: confirmNicknameReducer,
  modal: modalReducer,
  btnColor: btnColorReducer,
  navDisplay: navDisplayReducer,
  getBeer: getBeerReducer,
  changepage: changePageReducer,
  beerDetail: beerDetailReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
