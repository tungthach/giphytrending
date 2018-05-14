import './asset/style/app.scss';

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { CLIENT_INIT, DevTools, IntlProvider } from 'core';

import { store } from './redux/store';
import { routes } from './routes';
import { lightTheme } from './utility';

const muiTheme = getMuiTheme(lightTheme);
const history = createHistory();
const appStore = store.create();
const devTools = __DEVTOOLS__ ? <DevTools /> : null;

/* react-tap-event-plugin to listen for touch/tap/clickevents */
injectTapEventPlugin();

// Dispatch event client init.
appStore.dispatch({ type: CLIENT_INIT });

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider key="provider" store={appStore}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>

        {devTools}
      </IntlProvider>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('app')
);
