import React from 'react';
import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';
import { createDevTools } from 'redux-devtools';

export const DevTools = __DEVTOOLS__
  ? createDevTools(
    <DockMonitor
      toggleVisibilityKey='ctrl-h'
      changePositionKey='ctrl-q'
      defaultIsVisible={false}>
      <Inspector supportImmutable={true} />
    </DockMonitor>
  )
  : null;
