import { asyncComponent } from 'core';

import Counter from 'bundle-loader?lazy!./counter.component';
import { URL_COUNTER } from './counter.constant';

const component = asyncComponent({
  component: Counter
});

export const counterRoute = {
  path: URL_COUNTER,
  exact: true,
  component
};
