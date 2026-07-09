import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems';
import MobileMenu from './MobileMenu';
import SearchPopup from './SearchPopup';
import Sidebar from './Sidebar';
const defaultLogo = `${process.env.PUBLIC_URL}/logowhitebg.png`;
const vtdLogo = `${process.env.PUBLIC_URL}/images/logos/vtd.jpeg`;

const getSafeImageUrl = (url) => encodeURI(url || defaultLogo);

const handleLogoError = (event) => {
    if (event.currentTarget.dataset.fallbackApplied === 'true') {
        return;
    }

    event.currentTarget.dataset.fallbackApplied = 'true';
    event.currentTarget.src = getSafeImageUrl(defaultLogo);
};

const BrandLogo = ({ navLogo }) => (
    <div className="main-menu__logo">
        <Link to="/" className="logo-link" aria-label="Rekha WPC Telangana home">
            <img
                src={getSafeImageUrl(navLogo)}
                alt="Rekha WPC Telangana"
                className="logo-img"
                onError={handleLogoError}
            />
            <div className="logo-text">
                <span className="logo-title">Rekha</span>
                <span className="logo-subtitle">WPC Telangana</span>
            </div>
        </Link>
    </div>
);

const Header = (props) => {
    const { parentMenu, secondParentMenu, activeMenu, navImg } = props;
    const navLogo = navImg || defaultLogo;
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenu, setMobileMenu] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [isSidebar, setIsSidebar] = useState(false);

    const handleMobileMenu = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setMobileMenu(!isMobileMenu);
        if (!isMobileMenu) {
            document.body.classList.add("mobile-menu-visible");
            document.documentElement.classList.add("mobile-menu-visible");
        } else {
            document.body.classList.remove("mobile-menu-visible");
            document.documentElement.classList.remove("mobile-menu-visible");
        }
    }
    const handlePopup = () => {
        setIsPopup(!isPopup);
    }
    const handleSidebar = () => {
        setIsSidebar(!isSidebar);
    }
    const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };
    
        useEffect(() => {
            document.addEventListener("scroll", handleScroll);
            return () => document.removeEventListener("scroll", handleScroll);
        }, []);

    return (
        <React.Fragment>
            <header className={`main-header ${isVisible ? "fixed-header" : ""}`}>
                <nav className="main-menu">
                <div className="main-menu__wrapper">
                    <div className="main-menu__wrapper-inner">
                        <div className="main-menu__left">
                                                        <BrandLogo navLogo={navLogo} />

                        </div>
                        <div className="main-menu__main-menu-box">
                                                <button 
                            className="mobile-nav__toggler" 
                            onClick={handleMobileMenu}
                            aria-label="Toggle mobile menu"
                                                        type="button"
                        >
                            <i className="fa fa-bars" />
                                                </button>
                        <ul className="main-menu__list">
                            <MenuItems
                                parentMenu={parentMenu}
                                secondParentMenu={secondParentMenu}
                                activeMenu={activeMenu}
                            />
                        </ul>
                        </div>
                        <div className="main-menu__right">
                        <div className="main-menu__vtd-logo">
                            <img src={vtdLogo} alt="VTD Logo" />
                        </div>
                        {/* <div className="main-menu__btn-box">
                            <Link to="/contact" className="main-menu__btn thm-btn">
                                Join WPC <span className="icon-arrow-right"></span>
                            </Link>
                        </div> */}
                        </div>
                    </div>
                </div>
                </nav>
                <div className={`stricky-header stricked-menu main-menu ${isVisible ? "stricky-fixed" : ""}`}>
                    <div className="sticky-header__content" />
                    <nav className="main-menu">
                        <div className="main-menu__wrapper">
                            <div className="main-menu__wrapper-inner">
                                <div className="main-menu__left">
                                    <BrandLogo navLogo={navLogo} />
                                </div>
                                <div className="main-menu__main-menu-box">
                                <button 
                                    className="mobile-nav__toggler" 
                                    onClick={handleMobileMenu}
                                    aria-label="Toggle mobile menu"
                                    type="button"
                                >
                                    <i className="fa fa-bars" />
                                </button>
                                <ul className="main-menu__list">
                                    <MenuItems
                                        parentMenu={parentMenu}
                                        secondParentMenu={secondParentMenu}
                                        activeMenu={activeMenu}
                                    />
                                </ul>
                                </div>
                                <div className="main-menu__right">
                                <div className="main-menu__vtd-logo">
                                    <img src={vtdLogo} alt="VTD Logo" />
                                </div>
                                {/* <div className="main-menu__btn-box">
                                    <Link to="/contact" className="main-menu__btn thm-btn">
                                        Join WPC <span className="icon-arrow-right"></span>
                                    </Link>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            <MobileMenu handleMobileMenu={handleMobileMenu} />
            </header>
            <SearchPopup isPopup={isPopup} handlePopup={handlePopup} />
            <Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />
        </React.Fragment>
    );
}

export default Header;
