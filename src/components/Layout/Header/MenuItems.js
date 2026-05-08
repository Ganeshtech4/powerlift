import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = ({ parentMenu, secondParentMenu, activeMenu }) => {
  return (
    <ul className="main-menu__list">
      <li className={parentMenu === 'Home' ? 'current-menu-item' : ''}>
        <Link to="/" className={activeMenu === '/' ? 'active-menu' : ''}>
          Home
        </Link>
      </li>

      <li className={parentMenu === 'About' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="/about" className={activeMenu === '/about' ? 'active-menu' : ''}>
          About
        </Link>
        <ul className="sub-menu">
          <li>
            <Link to="/team" className={activeMenu === '/team' ? 'active-menu' : ''}>
              Committee Members
            </Link>
          </li>
          <li>
            <Link to="/districts" className={activeMenu === '/districts' ? 'active-menu' : ''}>
              Districts
            </Link>
          </li>
          <li>
            <Link to="/referees" className={activeMenu === '/referees' ? 'active-menu' : ''}>
              Referees
            </Link>
          </li>
          <li>
            <Link to="/colloboration" className={activeMenu === '/colloboration' ? 'active-menu' : ''}>
              Partnerships
            </Link>
          </li>
        </ul>
      </li>

      {/* <li className={parentMenu === 'Events' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="/event" className={activeMenu === '/event' ? 'active-menu' : ''}>
          Events
        </Link>
        <ul className="sub-menu">
          <li>
            <Link to="/event" className={activeMenu === '/event' ? 'active-menu' : ''}>
              All Events
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="/event-details/year-1">State Championship</Link>
              </li>
              <li>
                <Link to="/event-details/year-3">Gym Point Championship</Link>
              </li>
              <li>
                <Link to="/event-details/year-4">Origin Championship</Link>
              </li>
              <li>
                <Link to="/event-details/year-5">Ozzie Championship</Link>
              </li>
              <li>
                <Link to="/event-details/year-6">Potens Championship</Link>
              </li>
              <li>
                <Link to="/event-details/year-7">Second State Championship</Link>
              </li>
              <li>
                <Link to="/event-details/year-8">Telangana First State Championship</Link>
              </li>
              <li>
                <Link to="/event-details/year-9">FSG Independence Day</Link>
              </li>
              <li>
                <Link to="/event-details/year-10">AF Championship</Link>
              </li>
            </ul>
          </li>
        </ul>
      </li> */}
      <li className={parentMenu === 'gallery' ? 'current-menu-item' : ''}>
        <Link to="/gallery" className={activeMenu === '/gallery' ? 'active-menu' : ''}>
          Gallery
        </Link>
      </li>
      <li className={parentMenu === 'Results' ? ' current-menu-item' : ''}>
        <Link to="/results" className={activeMenu === '/results' ? 'active-menu' : ''}>
          Results
        </Link>
        <ul className="sub-menu">

          {/* <li>
            <Link to="/gallery" className={activeMenu === '/gallery' ? 'active-menu' : ''}>
              Photo Gallery
            </Link>
          </li> */}
        </ul>
      </li>

      <li className={parentMenu === 'Resources' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#" className={activeMenu === '/inkspire' || activeMenu === '/vtd' ? 'active-menu' : ''}>
          Resources
        </Link>
        <ul className="sub-menu">
          <li>
            <Link to="/vtd" className={activeMenu === '/vtd' ? 'active-menu' : ''}>
              VTD
            </Link>
          </li>
          <li>
            <Link to="/inkspire" className={activeMenu === '/inkspire' ? 'active-menu' : ''}>
              Inkspire
            </Link>
          </li>
        </ul>
      </li>

      <li className={parentMenu === 'Register' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="/registration" className={activeMenu === '/registration' ? 'active-menu' : ''}>
          Register
        </Link>
        <ul className="sub-menu">
          <li>
            <Link to="/registration" className={activeMenu === '/registration' ? 'active-menu' : ''}>
              Registration
            </Link>
          </li>
          <li>
            <Link to="/calendar" className={activeMenu === '/calendar' ? 'active-menu' : ''}>
              Calendar
            </Link>
          </li>
        </ul>
      </li>

      <li className={parentMenu === 'Contact' ? 'current-menu-item' : ''}>
        <Link to="/contact" className={activeMenu === '/contact' ? 'active-menu' : ''}>
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default MenuItems;
