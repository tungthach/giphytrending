import React from 'react';

/**
 * Render not found component
 * @return {Component}        App component
 */
const view = () => {
  return (
    <div className="section__not-found">
      <h1>404 Error</h1>
      <p>
        <em>Not Found</em>
      </p>
    </div>
  );
};

/**
 * Not found app view
 */
export const notFoundView = {
  view
};
