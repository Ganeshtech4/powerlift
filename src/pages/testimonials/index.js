import React, { useEffect, useState } from 'react';

import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';

import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';

import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import TestimonialsMain from './TestimonialsMain';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg1 = `${process.env.PUBLIC_URL}/images/backgrounds/Testimonialspage-header-bg.jpg`;


// Breadcrumbs Background Image

const Testimonials = () => {

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
            parentMenu='testimonials'
            activeMenu="/testimonials"
        />
        {/* SiteBreadcrumb */}
        <SiteBreadcrumb
            pageTitle="Testimonials"
            pageName="Testimonials"
            breadcrumbsImg={bannerbg1}
        />
        {/* SiteBreadcrumb */}
        <TestimonialsMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
    </React.Fragment>
    );
}

export default Testimonials;