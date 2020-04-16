import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const activeStyle = { color: '#f15b2a' };
  return (
    <nav>
      <NavLink to='/' exact activeStyle={activeStyle}>
        Home
      </NavLink>{' '}
      {' | '}
      <NavLink to='/courses' exact activeStyle={activeStyle}>
        Courses
      </NavLink>{' '}
      {' | '}
      <NavLink to='/about' activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
}

export default Header;
