import _ from 'lodash';

import { intlBuilder } from './intl.context';
import { routerBuilder } from './router.context';

const contextBuilders = [
  intlBuilder,
  routerBuilder
];

export const buildContext = (node, options = {
    forceBuild: false
  }) => {
  let result = {};
  const {forceBuild} = options;

  contextBuilders.forEach((builder) => {
    if (forceBuild || builder.hasContext(node, options)) {
      result = _.merge({}, result, builder.createContext(options));
    }
  });

  return result;
};