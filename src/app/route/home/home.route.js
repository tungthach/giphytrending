import { asyncComponent } from 'core';

import homeComponent from 'bundle-loader?lazy!./home.component';
import { URL_HOME } from './home.constant';

const component = asyncComponent({
  component: homeComponent
});

export const homeRoute = {
  path: URL_HOME,
  exact: true,
  component
};
