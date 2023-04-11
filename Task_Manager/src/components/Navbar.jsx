import React from 'react';
import { Link } from 'react-router-dom';
import LWSLogo from '../../public/images/logo.svg';
import Search from '../ui/Search';

function Navbar() {
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={LWSLogo} alt="lws_logo" />
        </Link>
        <Search />
      </div>
    </nav>
  );
}

export default Navbar;
