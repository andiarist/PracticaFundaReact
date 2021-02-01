import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './layout.css';

import { logout } from '../../api/auth';
import ConfirmButton from '../tools/ConfirmButton';

function Header({ ...props }) {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };
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
      <ConfirmButton
        acceptAction={handleLogout}
        confirmProps={{
          title: 'Logout',
          message: 'Are you sure you want to logout?',
        }}>
        Logout
      </ConfirmButton>
    </header>
  );
}

export default Header;
