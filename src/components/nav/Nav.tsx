import React, { useState } from 'react';
import { NavProps } from '../../containers/Nav';

export const Nav = ({
  isSignin,
  userData,
  setSignin,
  iconDisplay,
  barDisplay,
}: NavProps): JSX.Element => {
  return (
    <div>
      <div>
        <div>
          Navbar test{' '}
          <input
            type='checkbox'
            id='isSignin'
            checked={isSignin}
            onClick={() =>
              isSignin
                ? setSignin({ id: 0, username: '' }, false, '')
                : setSignin({ id: 100, username: 'test' }, true, 'test token')
            }
          ></input>
          {' -> '}
          isSignin={String(isSignin)}{' '}
          <button>{isSignin ? `로그아웃` : `로그인`}</button>
        </div>
        <div>userData={JSON.stringify(userData)}</div>
        <div>
          iconDisplay={String(iconDisplay)} && barDisplay={String(barDisplay)}
        </div>
      </div>
    </div>
  );
};
