import React, { useEffect, useState } from "react";

import BackToTop from "../../components/elements/BackToTop";
import Header from "../../components/Layout/Header";

import Footer from "../../components/Layout/Footer";

import CtaTwo from "../../components/Common/CtaSection/CtaTwo";
import InspireMain from "./InspireMain";

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;

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
        parentMenu="Resources"
        activeMenu="/inkspire"
      />
      <InspireMain />
      {/* Call to Action */}
      <CtaTwo />
      <BackToTop scroll={isVisible} />
      <Footer />
    </>
  );
};

export default Inspire;
