import React from 'react';
import Banner from "./Banner.js"
import ServicesOne from './ServicesOne';
import SlidingText from './SlidingText';
import BuyTicket from './BuyTicket';
import TeamOne from './TeamOne';
import GalleryOne from './GalleryOne';
import BrandOne from './BrandOne';
import BlogOne from './BlogOne';
import CTAOne from './CTAOne';


const HomeMain = () => {
	return (
		<React.Fragment>
			<Banner />
			<ServicesOne />
			<SlidingText />
			<BlogOne />
			<BuyTicket />
			<TeamOne />
			<GalleryOne />
			<BrandOne />
			<CTAOne />
		</React.Fragment>
	);
}

export default HomeMain;