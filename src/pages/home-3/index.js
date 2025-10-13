import React, { useEffect, useState } from 'react';
import HomeThreeMain from './HomeThreeMain';
import Footer from '../../components/Layout/Footer';
import HeaderStyleThree from '../../components/Layout/Header/HeaderStyleThree';
import BackToTop from '../../components/elements/BackToTop';

const HomeThree = () => {
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
		<div className="homestyle2">
		<React.Fragment>
            <HeaderStyleThree />
             <HomeThreeMain/>
            <BackToTop scroll={isVisible} />
            <Footer />
		</React.Fragment>
		</div>
	);
}

export default HomeThree;
