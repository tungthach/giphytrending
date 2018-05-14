import React from 'react';

/**
 * Test component is used in test that need a generic component
 */
export class Test extends React.Component {
  render() {
    return <div className={'test '.concat(this.props.className)}>{this.props.children}</div>;
  }
}