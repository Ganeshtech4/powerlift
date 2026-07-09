import React, { useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import BackToTop from '../../components/elements/BackToTop';
import NewsMain from './NewsMain';

const navImg = `${process.env.PUBLIC_URL}/logowhitebg.png`;

const NewsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <React.Fragment>
      <Header navImg={navImg} parentMenu="News" activeMenu="/news" />
      <NewsMain />
      <BackToTop scroll={isVisible} />
      <Footer />
    </React.Fragment>
  );
};

export default NewsPage;
