import React from 'react';
import { Link } from 'react-router-dom';
import Footershape from '../../../assets/images/shapes/site-footer-shape-1.png';
import footerLogo from '../../../assets/images/plat2.png';

const Footer = () => {

  return (
    <>
    {/* Site Footer Start */}
    <footer className="site-footer">
        <div className="site-footer__shape-1 float-bob-y">
            <img src={Footershape} alt="" />
        </div>
        <div className="site-footer__top">
            <div className="container">
                <div className="site-footer__top-inner">
                    <div className="site-footer__logo">
                        <Link to="/">
                            <img src={footerLogo} alt="" />
                        </Link>
                    </div>
                    <div className="site-footer__social">
                        <Link to="#"><i className="icon-facebook"></i></Link>
                        <Link to="#"><i className="icon-fi"></i></Link>
                        <Link to="#"><i className="icon-instagram"></i></Link>
                        <Link to="#"><i className="icon-pinterest"></i></Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="site-footer__middle">
            <div className="container">
                <div className="site-footer__middle-inner">
                    <div className="row">
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                            <div className="footer-widget__column footer-widget__events">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Upcoming Championships</h3>
                                </div>
                                <ul className="footer-widget__events-list list-unstyled">
                                    <li>
                                        <p>2025 District Championships</p>
                                        <h5>WPC–Telangana District Meet</h5>
                                        <Link to="/event-details">Register Now <span className="icon-arrow-right"></span></Link>
                                    </li>
                                    <li>
                                        <p>2025 State Championships</p>
                                        <h5>WPC–Telangana State Championships</h5>
                                        <Link to="/event-details">Apply Here <span className="icon-arrow-right"></span></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                            <div className="footer-widget__column footer-widget__link">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Quick links</h3>
                                </div>
                                <ul className="footer-widget__link-list list-unstyled">
                                    <li><Link to="/about">About WPC–Telangana</Link></li>
                                    <li><Link to="/services">Championships</Link></li>
                                    <li><Link to="/contact">Membership</Link></li>
                                    <li><Link to="/blog">News & Updates</Link></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                            <div className="footer-widget__column footer-widget__our-company">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Events & Programs</h3>
                                </div>
                                <ul className="footer-widget__link-list list-unstyled">
                                    <li><Link to="/schedule-list-2">District Championships</Link></li>
                                    <li><Link to="/about">State Championships</Link></li>
                                    <li><Link to="/about">Open Meets</Link></li>
                                    <li><Link to="/about">Training Workshops</Link></li>
                                    <li><Link to="/about">Referee Seminars</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                            <div className="footer-widget__column footer-widget__contact">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Contact</h3>
                                </div>
                                <div className="footer-widget__contact-inner">
                                    <ul className="footer-widget__contact-list list-unstyled">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-envelop"></span>
                                            </div>
                                            <div className="text">
                                                <p><a href="mailto:info@wpctelangana.in">info@wpctelangana.in</a></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>WPC–Telangana Headquarters, Hyderabad, Telangana, India</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-call"></span>
                                            </div>
                                            <div className="text">
                                                <p><a href="tel:+91XXXXXXXXXXX">+91 XXXXX XXXXX</a></p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="site-footer__bottom">
            <div className="container">
                <div className="site-footer__bottom-inner">
                    <p className="site-footer__bottom-text">© WPC–Telangana 2025 | Official State Body of WPC–India | All Rights Reserved</p>
                    <ul className="list-unstyled site-footer__bottom-menu">
                        <li><Link to="/about">Terms & Condition</Link></li>
                        <li><Link to="/about">Privacy Policy</Link></li>
                        <li><Link to="/about">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    {/* Site Footer End */}
    </>
  );
};

export default Footer;
