import React from 'react';

import { BaseComponent } from 'component/base';

import './loader.style.scss';

export class Loader extends BaseComponent {
  render() {
    return (
      <div className="loader">
        <div className="cube1" />
        <div className="cube2" />
      </div>
    );
  }
}
