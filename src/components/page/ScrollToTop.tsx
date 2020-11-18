import React, {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import { DefaultProps } from '../../containers/page/HomeContainer';

type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

interface ScrollToTopProps extends DefaultProps {
  children: ReactNode;
}

function ScrollToTop(props: ScrollToTopProps): JSX.Element {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return <>{props.children}</>;
}
export default withRouter(ScrollToTop);
