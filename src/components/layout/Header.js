import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './layout.css';

import { logout } from '../../api/auth';

import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

function Header({ ...props }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    setIsModalVisible(false);
    logout();

    history.push('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      <Button type="primary" onClick={showModal}>
        Logout
      </Button>
      <Modal
        title="Delete Advert"
        visible={isModalVisible}
        onOk={handleLogout}
        onCancel={handleCancel}>
        <p>Are you sure you want to logout?</p>
      </Modal>
    </header>
  );
}

export default Header;
