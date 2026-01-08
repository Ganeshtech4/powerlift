import React, { useEffect, useState } from 'react';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import bannerbg from '../../assets/images/resources/schedule-one-1-6.jpg'
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import EventMain from './EventMain';


// Breadcrumbs Background Image

const Event = () => {

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
            parentMenu='event'
            activeMenu="/event"
        />
        {/* SiteBreadcrumb */}
        <SiteBreadcrumb
            pageTitle="Event"
             pageName={
    <span style={{ color: '#ff1493', fontSize: '25px', fontWeight: '700' }}>
      Event
    </span>
  }
            // pageName="Event"
            breadcrumbsImg={bannerbg}
        />
        {/* SiteBreadcrumb */}
        <EventMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
    </React.Fragment>
    );
}

export default Event;