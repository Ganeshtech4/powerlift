import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import EventMain from './EventDetails';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const EventBanner1 = `${process.env.PUBLIC_URL}/images/resources/schedule-one-1-1.jpg`;
const EventBanner2 = `${process.env.PUBLIC_URL}/images/resources/schedule-one-1-2.jpg`;
const EventBanner3 = `${process.env.PUBLIC_URL}/images/resources/event-details-img-box-img-11.jpg`;
const EventBanner4 = `${process.env.PUBLIC_URL}/images/resources/schedule-one-1-4.jpg`;
const EventBanner5 = `${process.env.PUBLIC_URL}/images/resources/schedule-one-1-5.jpg`;
const EventBanner6 = `${process.env.PUBLIC_URL}/images/resources/schedule-one-1-6.jpg`;
const EventBanner7 = `${process.env.PUBLIC_URL}/images/resources/schedule-one-1-7.jpg`;
const EventBanner8 = `${process.env.PUBLIC_URL}/images/resources/schedule-one-1-8.jpg`;
const EventBanner9 = `${process.env.PUBLIC_URL}/images/resources/schedule-one-1-10.jpg`;
const DefaultBanner = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`;

const Event = () => {
  const { eventId } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  const bannerMap = {
    'year-1': EventBanner1, 
    'year-3': EventBanner3, 
    'year-4': EventBanner4,
    'year-5': EventBanner5, 
    'year-6': EventBanner6, 
    'year-7': EventBanner7, 
    'year-8': EventBanner9, 
    'year-9': EventBanner2, 
    'year-10': EventBanner8, 
  };

  const titleMap = {
    'year-1': 'State Championship',
    'year-3': 'Gym Point Championship',
    'year-4': 'Origin Championship',
    'year-5': 'Ozzie Championship',
    'year-6': 'Potens Championship',
    'year-7': 'Second State Championship',
    'year-8': 'Telangana First State Championship',
    'year-9': 'FSG Independence Day',
    'year-10': 'AF Championship',
  };


  const breadcrumbsImg = bannerMap[eventId] || DefaultBanner;
  const pageTitle = titleMap[eventId] || 'Event Details';

  
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

     
      <SiteBreadcrumb
        pageTitle={pageTitle} 
        pageName={
  <span style={{ color: '#ff1493', fontSize: '25px', fontWeight: '700' }}>
    {pageTitle}
  </span>
}


 


        // pageName={pageTitle} 
        breadcrumbsImg={breadcrumbsImg}
      />
      <EventMain />
      <CtaTwo />
      <BackToTop scroll={isVisible} />
      <Footer />
    </React.Fragment>
  );
};

export default Event;
