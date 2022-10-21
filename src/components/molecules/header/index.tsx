import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesString } from 'routes/routesString';
const Header = () => {
  return (
    <div>
      <Link to={RoutesString.Timebar}>Timebar</Link>
      <Link to={RoutesString.Translator}>Translator</Link>
    </div>
  );
};

export default Header;
