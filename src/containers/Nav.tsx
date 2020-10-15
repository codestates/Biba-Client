import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { RootState } from '../modules';
import { setSearchBar } from '../modules/searchbar';

import { Nav } from '../components/nav/Nav';

const mapStateToProps = (state: RootState) => {
  return { ...state.searchBar };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSearchBar: (iconState: boolean, barState: boolean) =>
      dispatch(setSearchBar(iconState, barState)),
  };
};

export type NavProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
