import React from 'react';
import { Link } from 'react-router-dom';
const Footershape = `/images/shapes/site-footer-shape-1.png`;
const footerLogo = `/images/logo wpc.png`;

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
                                <Link to="/" className="logo-link">
                                    <img src={footerLogo} alt="Logo" className="logo-img" />
                                    <div className="logo-text">
                                        <span className="logo-title" style={{ color: 'red' }}>Rekha</span>
                                        <br />
                                        <span className="logo-subtitle" style={{ color: 'blue' }}>WPC Telangana</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="site-footer__social">
                                <Link to="https://www.facebook.com/p/Telangana-State-Powerlifting-Association-100066545078243/"><i className="icon-facebook"></i></Link>

                                <Link to="https://www.instagram.com/wpc_telangana_powerlifting/"><i className="icon-instagram"></i></Link>

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
                                            </li>
                                            <li>
                                                <p>2025 State Championships</p>
                                                <h5>WPC–Telangana State Championships</h5>
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
                                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
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
                                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="500ms">
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
                                                        <p><a href="mailto:info@wpctelangana.in">powerliftingassociationofts@gmail.com</a></p>
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
                                                        <p><a href="tel:+91XXXXXXXXXXX">+91 7330778111</a></p>
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
                            <p className="site-footer__bottom-text">© Rekha WPC–Telangana 2025 | Powered by APT IT</p>
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
