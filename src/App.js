import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import HomeTwo from "./pages/home-2";
import HomeThree from "./pages/home-3";
import OnePageHome from "./pages/one-page-style-one";
import OnePageHomeTwo from "./pages/one-page-style-two";  
import OnepageHomeThree from "./pages/one-page-style-three";
import About from "./pages/about";
import Team from "./pages/team";
import TeamDetails from "./pages/team-details";
import Testimonials from "./pages/testimonials";
import Pricing from "./pages/pricing";
import Faq from "./pages/faq";
import NoPage from "./pages/NoPage";
import Services from "./pages/services";
import EventProdigy from "./pages/event-prodigy";
import StellarEvents from "./pages/stellar-events-co";
import EliteEventManagement from "./pages/elite-event-management";
import InfiniteOccasions from "./pages/infinite-occasions";
import DreamEvent from "./pages/dream-event-planners";
import Gallery from "./pages/gallery";
import GalleryDetails from "./pages/gallery-details";
import Event from "./pages/event";
import EventDetails from "./pages/event-details";
import Blog from "./pages/blog";
import Bloglist from "./pages/blog-list";
import BlogDetails from "./pages/blog-details";
import Contact from "./pages/contact";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home-2" element={<HomeTwo />} />
        <Route path="home-3" element={<HomeThree />} />
        <Route path="about" element={<About />} />
        <Route path="one-page-style-one" element={<OnePageHome />} />
        <Route path="one-page-style-two" element={<OnePageHomeTwo />} />
        <Route path="one-page-style-three" element={<OnepageHomeThree />} />
        <Route path="team" element={<Team />} />
        <Route path="team-details" element={<TeamDetails />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery-details" element={<GalleryDetails />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<NoPage />} />
        <Route path="services" element={<Services />} />
        <Route path="event-prodigy" element={<EventProdigy />} />
        <Route path="stellar-events-co" element={<StellarEvents />} />
        <Route path="elite-event-management" element={<EliteEventManagement />} />
        <Route path="infinite-occasions" element={<InfiniteOccasions />} />
        <Route path="dream-event-planners" element={<DreamEvent />} />
         <Route path="event-details" element={<EventDetails />} />
         <Route path="event" element={<Event />} />
         <Route path="blog" element={<Blog />} />
         <Route path="blog-list" element={<Bloglist />} />
         <Route path="blog-details" element={<BlogDetails />} />
         <Route path="contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
