
import { object } from 'prop-types';
import { BaseComponent, view } from 'core';

import { ATTR_DATA_ROUTE } from './example.constant';
import { exampleView } from './example.view';
import { getMenus } from './example.service';

@view(exampleView)
export default class Example extends BaseComponent {
  /**
   * Constructor
   * @param  {object} props The component props
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.menus = getMenus() || [];
  }

  /**
   * Define propType
   */
  static propTypes = {
    route: object
  }

  /**
   * Define contextTypes
   */
  static contextTypes = {
    router: object
  };

  /**
   * Get selected index
   * @return {number} Selected index
   */
  getSelectedIndex = () => {
    let selectedIndex = 0;

    this.menus.forEach((menu, index) => {
      if (this.context.router.history.location.pathname.endsWith(menu.link)) {
        selectedIndex = index;

        return;
      }
    });

    return selectedIndex;
  }

  /**
   * Handle onActive tab
   * @param  {object} tab Tab props
   * @return {void}
   */
  onActive = (tab) => {
    const nextUrl = tab && tab.props[ATTR_DATA_ROUTE];
    const { push, location } = this.context.router.history;

    if (nextUrl && nextUrl !== location.pathname) {
      push(tab.props[ATTR_DATA_ROUTE]);
    }
  }

  /**
   * Model for view
   * @return {object} Model object for view
   */
  get model() {
    return this.createModel({
      menus: this.menus,
      selectedIndex: this.getSelectedIndex()
    });
  }

  /**
   * Handler for view
   * @return {object} Model object for view
   */
  get handler() {
    return this.createHandler();
  }
}