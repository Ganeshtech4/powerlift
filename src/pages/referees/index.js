import React, { useEffect, useState } from 'react';

import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';

import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';

import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import RefereesMain from './RefereesMain';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`;


// Breadcrumbs Background Image

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
            activeMenu="/Referees"
        />
        {/* SiteBreadcrumb */}
        <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
          <SiteBreadcrumb
            pageTitle="Referees"
            pageName={
              <span style={{ color: '#000000', fontSize: '20px', fontWeight: '700', margin: '0px' }}>
                Referees
              </span>
            }
            breadcrumbsImg={bannerbg}
          />
        </div>
        {/* SiteBreadcrumb */}
        <RefereesMain/>
        {/*cta-section */}
        <CtaTwo/>
        {/*cta-section end */}
        <BackToTop scroll={isVisible} />
        <Footer />
        
        {/* Custom Breadcrumb Styling */}
        <style>{`
          .page-header {
            padding: 40px 0 !important;
            min-height: 200px !important;
          }
          
          .page-header h2 {
            color: #000000 !important;
            font-size: 1.8rem !important;
          }
          
          .thm-breadcrumb li,
          .thm-breadcrumb li a,
          .thm-breadcrumb li span {
            color: #000000 !important;
          }
          
          .thm-breadcrumb li a:hover {
            color: #333333 !important;
          }
          
          .icon-angle-left {
            color: #000000 !important;
          }
        `}</style>
    </React.Fragment>
    </div>
    );
}

export default Referees;