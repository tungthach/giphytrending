import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import './counter.style';

/**
 * Render Counter view
 * @param  {object} model   Model for view
 * @param  {object} handler Handler for view
 * @return {Component}      Counter component
 */
export const counterView = (model, handler) => {
  const { counter } = model;
  const { onClickIncrease, onClickDecrease } = handler;

  return (
    <div className="counter">
      <h2>Counter with Local UI State: {counter}</h2>

      <div className="mt counter__buttons">
        <RaisedButton label="Decrease" onClick={onClickDecrease} />
        <RaisedButton primary label="Increase" onClick={onClickIncrease} />
      </div>
    </div>
  );
};