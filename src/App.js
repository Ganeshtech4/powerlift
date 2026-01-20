import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Home from "./pages/home";
import TeamDetailsPage from "./pages/team/TeamDetailsPage";
import About from "./pages/about";
import Team from "./pages/team";
import TestimonialsMain from "./pages/testimonials/TestimonialsMain";
import Testimonials from "./pages/testimonials";
import Faq from "./pages/faq";
import NoPage from "./pages/NoPage";
import Services from "./pages/services";
import Gallery from "./pages/gallery";
import Colloboration from "./pages/colloboration";
import GalleryDetails from "./pages/gallery-details";
import GalleryBlog from "./pages/blog";
import GalleryBlogDetails from "./pages/blog/BlogDetails";
import Contact from "./pages/contact";
import Referees from "./pages/referees";
import Inspire from "./pages/inspire";
import InspireDetails from "./pages/inspire/InspireDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogEditor from "./pages/admin/sections/BlogEditor";
import ResultEditor from "./pages/admin/sections/ResultEditor";
import Registration from "./pages/registration";
import ScrollToTop from "./ScrollToTop";
import ResultsNew from "./pages/Results/Results";
import Districts from "./pages/Districts/Districts";
import Calendar from "./pages/Calendar/Calendar";

// Redirect component for old blog routes
const BlogRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/gallery-blog-details/${id}`} replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="team-details/:id" element={<TeamDetailsPage />} />
        <Route path="districts" element={<Districts />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="testimonials-main" element={<TestimonialsMain />} />
        <Route path="referees" element={<Referees />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="colloboration" element={<Colloboration />} />
        <Route path="gallery-details" element={<GalleryDetails />} />
        <Route path="faq" element={<Faq />} />
        <Route path="services" element={<Services />} />
        <Route path="gallery-blog" element={<GalleryBlog />} />
        <Route path="gallery-blog-details/:id" element={<GalleryBlogDetails />} />
        {/* Redirect old blog routes to new gallery routes */}
        <Route path="blog" element={<Navigate to="/gallery-blog" replace />} />
        <Route path="blog-details/:id" element={<BlogRedirect />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/blog-editor" element={<BlogEditor />} />
        <Route path="admin/blog-editor/:id" element={<BlogEditor />} />
        <Route path="admin/results/new" element={<ResultEditor />} />
        <Route path="admin/results/edit/:id" element={<ResultEditor />} />
        <Route path="contact" element={<Contact />} />
        <Route path="registration" element={<Registration />} />
        <Route path="inspire" element={<Inspire />} />
        <Route path="inspire-details/:id" element={<InspireDetails />} />
        <Route path="results" element={<ResultsNew />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
