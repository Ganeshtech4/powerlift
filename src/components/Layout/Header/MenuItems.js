import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";

const MenuItems = ({ parentMenu, secondParentMenu, activeMenu }) => {
  return (
    <ul className="main-menu__list">
      <li className={parentMenu === 'Home' ? 'current-menu-item' : ''}>
        <Link to="/" className={activeMenu === '/' ? 'active-menu' : ''}>
          Home
        </Link>
      </li>
      <li className={parentMenu === 'Pages' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Pages</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/about" className={activeMenu === '/about' ? 'active-menu' : ''}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/team" className={activeMenu === '/team' ? 'active-menu' : ''}>
              Committee Members
            </Link>
          </li>
          <li>
            <Link to="/team-details" className={activeMenu === '/team-details' ? 'active-menu' : ''}>
              Referees
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className={activeMenu === '/testimonials' ? 'active-menu' : ''}>
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/pricing" className={activeMenu === '/pricing' ? 'active-menu' : ''}>
              Results
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={activeMenu === '/gallery' ? 'active-menu' : ''}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/gallery-details" className={activeMenu === '/gallery-details' ? 'active-menu' : ''}>
              Gallery Details
            </Link>
          </li>
          <li>
            <Link to="/faq" className={activeMenu === '/faq' ? 'active-menu' : ''}>
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/404" className={activeMenu === '/404' ? 'active-menu' : ''}>
              404 Error
            </Link>
          </li>
        </ul>
      </li>


      <li className={parentMenu === 'Events' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Events</Link>
        <ul className="sub-menu">
          <li className={parentMenu === 'Championships' ? 'dropdown current-menu-item' : 'dropdown'}>
            <Link
              to="/event"
              className={`flex items-center justify-between ${activeMenu === '/event' ? 'active-menu' : ''}`}
            >
              {/* Championships <span className="ml-2">▼ </span> */}
               Championships <span className="ml-2">+</span>
            </Link>

            
            <ul className="sub-menu">
              <li>
                <Link to="/event-details/year-1" className={activeMenu === '/state-championship' ? 'active-menu' : ''}>
                  State Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-3" className={activeMenu === '/gym-point-championship' ? 'active-menu' : ''}>
                  Gym Point Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-4" className={activeMenu === '/origin-championship' ? 'active-menu' : ''}>
                  Origin Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-5" className={activeMenu === '/ozzie-championship' ? 'active-menu' : ''}>
                  Ozzie Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-6" className={activeMenu === '/potens-championship' ? 'active-menu' : ''}>
                  Potens Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-7" className={activeMenu === '/second-state-championship' ? 'active-menu' : ''}>
                  Second State Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-8" className={activeMenu === '/telangana-first-state-championship' ? 'active-menu' : ''}>
                  Telangana First State Championship
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-9" className={activeMenu === '/fsg-independence-day' ? 'active-menu' : ''}>
                  FSG Independence Day
                </Link>
              </li>
              <li>
                <Link to="/event-details/year-10" className={activeMenu === '/af-championship' ? 'active-menu' : ''}>
                  AF Championship3
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>

      <li className={parentMenu === 'Membership' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Membership</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/event" className={activeMenu === '/event' ? 'active-menu' : ''}>
              How to Join
            </Link>
          </li>
          <li>
            <Link to="/event-details" className={activeMenu === '/event-details' ? 'active-menu' : ''}>
              Benefits & Rules
            </Link>
          </li>
        </ul>
      </li>
      <li className={parentMenu === 'Blog' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Blog</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/blog" className={activeMenu === '/blog' ? 'active-menu' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/blog-list" className={activeMenu === '/blog-list' ? 'active-menu' : ''}>
              Blog List
            </Link>
          </li>
          <li>
            <Link to="/blog-details" className={activeMenu === '/blog-details' ? 'active-menu' : ''}>
              Blog Details
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
