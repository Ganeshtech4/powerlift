import React, { useEffect, useState } from 'react';
import HomeMain from './HomeMain';
import Footer from '../../components/Layout/Footer';
import HeaderStyleOne from '../../components/Layout/Header/HeaderStyleOne';
import BackToTop from '../../components/elements/BackToTop';


const Home = () => {
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
            <HeaderStyleOne />
             <HomeMain />
            <BackToTop scroll={isVisible} />
            <Footer />
        </React.Fragment>
    );
}

export default Home;
