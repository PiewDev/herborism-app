import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Logo
        </a>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="/" className="nav-links" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-links" onClick={toggleMenu}>
              Services
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;