import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import navImg1 from '../../assets/images/resources/logo-1.png';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import EventMain from './EventDetails';

// 🎯 Import unique banner images for each event
import EventBanner1 from '../../assets/images/resources/schedule-one-1-1.jpg'
import EventBanner2 from '../../assets/images/resources/schedule-one-1-2.jpg'
import EventBanner3 from '../../assets/images/resources/event-details-img-box-img-11.jpg'
import EventBanner4 from '../../assets/images/resources/schedule-one-1-4.jpg'
import EventBanner5 from '../../assets/images/resources/schedule-one-1-5.jpg'
import EventBanner6 from '../../assets/images/resources/schedule-one-1-6.jpg'
import EventBanner7 from '../../assets/images/resources/schedule-one-1-7.jpg'
import EventBanner8 from '../../assets/images/resources/schedule-one-1-8.jpg'
import EventBanner9 from '../../assets/images/resources/schedule-one-1-10.jpg'

// Default fallback
import DefaultBanner from '../../assets/images/backgrounds/page-header-bg.jpg';

const Event = () => {
  const { eventId } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  // 🖼️ Map event IDs (same as used in EventDetails.jsx → tab IDs)
  const bannerMap = {
    'year-1': EventBanner1, // State Championship
    'year-3': EventBanner3, // Gym Point
    'year-4': EventBanner4, // Origin
    'year-5': EventBanner5, // Ozzie
    'year-6': EventBanner6, // Potens
    'year-7': EventBanner7, // Second State
    'year-8': EventBanner9, // Telangana First State
    'year-9': EventBanner2, // FSG Independence
    'year-10': EventBanner8, // AF Championship
  };

  // Pick the correct banner or fallback
  const breadcrumbsImg = bannerMap[eventId] || EventBanner7;

  // 👇 handle scroll visibility for BackToTop
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <React.Fragment>
      <Header
        navImg={navImg1}
        parentMenu="event-details"
        activeMenu="/event-details"
      />

      {/* Dynamic Breadcrumb based on eventId */}
      <SiteBreadcrumb
        pageTitle="Event Details"
        pageName="Event Details"
        breadcrumbsImg={breadcrumbsImg}
      />

      {/* Main Event Details Component */}
      <EventMain />

      {/* CTA Section */}
      <CtaTwo />

      {/* Back To Top Button */}
      <BackToTop scroll={isVisible} />

      <Footer />
    </React.Fragment>
  );
};

export default Event;
