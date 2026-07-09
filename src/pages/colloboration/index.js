import React, { useEffect, useState } from 'react';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import ColloborationMain from './ColloborationMain'; // Make sure this file exists and is spelled correctly

const navImg1 = `${process.env.PUBLIC_URL}/logowhitebg.png`;

const Collaboration = () => {
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
                parentMenu='Collaboration'
                                activeMenu="/colloboration"
            />

            <ColloborationMain />

            <CtaTwo />

            <BackToTop scroll={isVisible} />
            <Footer />
        </React.Fragment>
    );
}

export default Collaboration;
