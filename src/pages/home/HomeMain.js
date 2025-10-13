import React from 'react';
import Banner from "./Banner"
import ServicesOne from './ServicesOne';
import SlidingText from './SlidingText';
import EventOne from './EventOne';
import BuyTicket from './BuyTicket';
import TeamOne from './TeamOne';
import EventDirection from './EventDirection';
import GalleryOne from './GalleryOne';
import ScheduleOne from './ScheduleOne';
import BrandOne from './BrandOne';
import BlogOne from './BlogOne';
import CTAOne from './CTAOne';


const HomeMain = () => {
	return (
		<React.Fragment>
			<Banner />
			<ServicesOne />
			<SlidingText />
			<EventOne />
			<BuyTicket />
			<TeamOne />
			<EventDirection />
			<GalleryOne />
			<ScheduleOne />
			<BrandOne />
			<BlogOne />
			<CTAOne />
		</React.Fragment>
	);
}

export default HomeMain;