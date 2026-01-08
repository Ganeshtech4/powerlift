import React, { useEffect, useState } from 'react';

import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';

import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import ResultsList from './ResultsList';

const navImg1 = `/images/logo wpc.png`;
const bannerbg = `/images/resources/schedule-one-1-6.jpg`;


const ResultsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 300);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <Header navImg={navImg1} parentMenu="Results" activeMenu="/results" />

      <SiteBreadcrumb
        pageTitle="Results"
        pageName="Results"
        breadcrumbsImg={bannerbg}
      />

      <ResultsList />
      <CtaTwo />

      <BackToTop scroll={isVisible} />
      <Footer />
    </React.Fragment>
  );
};

export default ResultsPage;
