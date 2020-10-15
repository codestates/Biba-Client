import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { RootState } from '../modules';
import { setSignin } from '../modules/signin';

import { Signin } from '../components/users/Signin';

const mapStateToProps = (state: RootState) => {
  return { ...state.signin };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSignin: (
      data: { id: number; username: string },
      state: boolean,
      token: string,
    ) => {
      console.log('signin');
      dispatch(setSignin(data, state, token));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
