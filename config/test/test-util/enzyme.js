import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { buildContext } from './context';

Enzyme.configure({ adapter: new Adapter() });

const shallow = (node, options) => {
  const context = buildContext(node, options);

  return Enzyme.shallow(node, context);
};

const mount = (node, options) => {
  const newOptions = Object.assign({}, options, {
    forceBuild: true
  });
  const context = buildContext(node, newOptions);

  return Enzyme.mount(node, context);
};

export { shallow, mount };