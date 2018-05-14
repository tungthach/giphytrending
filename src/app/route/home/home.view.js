import React from 'react';

import './home.style';

export const homeView = ({ children }) => {
  return (
    <section className="section">
      <h1>Welcome, click on dashboard item in left menu to see images !</h1>
      {children}
    </section>
  );
};
