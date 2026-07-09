import React, { useEffect, useState } from 'react';

import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';

import Footer from '../../components/Layout/Footer';

import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import RefereesMain from './RefereesMain';

const navImg1 = `${process.env.PUBLIC_URL}/logowhitebg.png`;

const Referees = () => {

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
        <div className="referees-page">
        <React.Fragment>
        <Header
            navImg={navImg1}
            parentMenu='Referees'
            activeMenu="/referees"
        />
        <RefereesMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
        
    </React.Fragment>
    </div>
    );
}

export default Referees;