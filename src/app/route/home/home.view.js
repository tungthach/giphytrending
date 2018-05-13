import React from 'react';

import './home.style';

export const homeView = ({ children }) => {
  return (
    <section className="section">
      <h1>Welcome home, baby!</h1>
      {children}
    </section>
  );
};
