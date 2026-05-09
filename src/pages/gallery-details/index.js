import React, { useEffect, useState } from 'react';

import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';

import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';

import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import GalleryDetailsMain from './GalleryDetailsMain';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/coverpagepic.jpg`;


// Breadcrumbs Background Image

const GalleryDetails = () => {

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
            parentMenu='gallery-details'
            activeMenu="/gallery-details"
        />
        {/* SiteBreadcrumb */}
        <SiteBreadcrumb
            pageTitle="Gallery Details"
            pageName="Gallery Details"
            breadcrumbsImg={bannerbg}
        />
        {/* SiteBreadcrumb */}
        <GalleryDetailsMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
    </React.Fragment>
    );
}

export default GalleryDetails;