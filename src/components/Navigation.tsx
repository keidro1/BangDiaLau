import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/favorites">Danh sách yêu thích</Link></li>
        <li><Link to="/profile">Trang cá nhân</Link></li>
        <LoginButton/>
      </ul>
    </nav>
  );
}

export default Navigation;
