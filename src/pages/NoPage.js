import React, { useEffect, useState } from 'react';

import BackToTop from '../components/elements/BackToTop';
import Header from '../components/Layout/Header';

import Footer from '../components/Layout/Footer';
import SiteBreadcrumb from '../components/Common/Breadcumb';

import CtaTwo from '../components/Common/CtaSection/CtaTwo';
import ErrorMain from '../components/Error/ErrorMain';

const navImg1 = `${process.env.PUBLIC_URL}/logowhitebg.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/coverpagepic.jpg`;


// Breadcrumbs Background Image

const NoPage = () => {

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
            parentMenu='error'
            activeMenu="/error"
        />
        {/* SiteBreadcrumb */}
        <SiteBreadcrumb
            pageTitle="404 Error"
            pageName="404 Error"
            breadcrumbsImg={bannerbg}
        />
        {/* SiteBreadcrumb */}
        <ErrorMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
    </React.Fragment>
    );
}

export default NoPage;