import React, { useEffect, useState } from 'react';

import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';

import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';

import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import ServicesMain from './ServicesMain';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`;


// Breadcrumbs Background Image

const Services = () => {

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <React.Fragment>
        <Header
            navImg={navImg1}
            parentMenu='services'
            activeMenu="/services"
        />
        {/* SiteBreadcrumb */}
        <SiteBreadcrumb
            pageTitle="Services"
            pageName="Services"
            breadcrumbsImg={bannerbg}
        />
        {/* SiteBreadcrumb */}
        <ServicesMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
    </React.Fragment>
    );
}

export default Services;