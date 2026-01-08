import React, { useEffect, useState } from "react";

import BackToTop from "../../components/elements/BackToTop";
import Header from "../../components/Layout/Header";

import Footer from "../../components/Layout/Footer";
import SiteBreadcrumb from "../../components/Common/Breadcumb";

import CtaTwo from "../../components/Common/CtaSection/CtaTwo";
import InspireMain from "./InspireMain";

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page6-header-bg.jpg`;


const Inspire = () => {
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
    <>
      <Header
        navImg={navImg1}
        parentMenu="Inspire"
        activeMenu="/inspire"
      />
      {/* Breadcrumb */}
      <SiteBreadcrumb
        pageTitle="Inspire"
         pageName={
    <span style={{ color: '#ff1493', fontSize: '25px', fontWeight: '700' }}>
      Inspire
    </span>
  }
        // pageName="Inspire"
        breadcrumbsImg={bannerbg}
      />
      {/* Main Content */}
      <InspireMain />
      {/* Call to Action */}
      <CtaTwo />
      <BackToTop scroll={isVisible} />
      <Footer />
    </>
  );
};

export default Inspire;
