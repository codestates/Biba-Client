import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { RootState } from '../modules';
import { setSignin } from '../modules/signin';

import { Signin } from '../components/users/Signin';

export default withRouter(
  connect(
    (state: RootState) => {
      return { ...state.signin };
    },
    (dispatch: Dispatch) => {
      return {
        setSignin: (
          data: { id: number; username: string },
          state: boolean,
          token: string,
        ) => dispatch(setSignin(data, state, token)),
      };
    },
  )(Signin),
);
