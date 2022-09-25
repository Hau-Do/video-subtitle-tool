import Header from 'components/molecules/header';
import React from 'react';

interface IAnonymousLayout {
  children?: React.ReactNode;
}
const AnonymousLayout: React.FC<IAnonymousLayout> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AnonymousLayout;
