import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

function Header({ ...props }) {
  return (
    <header className="header" {...props}>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/adverts">Adverts</Link>
          </li>
          <li>
            <Link to="/adverts/new">New Advert</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
