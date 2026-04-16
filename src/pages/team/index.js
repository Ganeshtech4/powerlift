import React, { useEffect, useState } from 'react';

import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';

import Footer from '../../components/Layout/Footer';

import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import TeamOne from '../home/TeamOne';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;

const Team = () => {

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
            parentMenu='team'
            activeMenu="/team"
        />
        <TeamOne variant="page" />
        {/* cta-section */}
        <CtaTwo/>
        {/* cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
    </React.Fragment>
    );
}

export default Team;