import { asyncComponent } from 'core';

import notFoundComponent from 'bundle-loader?lazy!./not-found.component';

const component = asyncComponent({
  component: notFoundComponent
});

export const notFoundRoute = {
  path: '*',
  component
};
