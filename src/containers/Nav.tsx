import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { RootState } from '../modules';
import { setSignin } from '../modules/signin';
import { setSearchBar } from '../modules/searchbar';

import { Nav } from '../components/nav/Nav';

const mapStateToProps = (state: RootState) => {
  return { ...state.searchBar, ...state.signin };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSignin: (
      data: { id: number; username: string },
      state: boolean,
      token: string,
    ) => dispatch(setSignin(data, state, token)),
    setSearchBar: (iconState: boolean, barState: boolean) =>
      dispatch(setSearchBar(iconState, barState)),
  };
};

export type NavProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
