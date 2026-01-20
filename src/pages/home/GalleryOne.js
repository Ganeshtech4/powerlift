"use client";

import { Link } from 'react-router-dom';
import GalleryImg1 from '../../assets/images/gallery/gallery-1.jpg';
import GalleryImg2 from '../../assets/images/gallery/gallery-2.jpg';
import GalleryImg3 from '../../assets/images/gallery/gallery-3.jpg';
import GalleryImg4 from '../../assets/images/gallery/gallery-4.jpg';
import GalleryImg5 from '../../assets/images/gallery/gallery-5.jpg';
import GalleryImg6 from '../../assets/images/gallery/gallery-6.jpg';
import GalleryImg7 from '../../assets/images/gallery/gallery-7.jpg';
import GalleryImg9 from '../../assets/images/gallery/gallery-9.jpg';

const galleryItems = [
  {
    src: GalleryImg1,
    alt: "WPC-Telangana Championship 1",
    title: "State Powerlifting Championship",
    subtitle: "WPC-Telangana 2024",
    href: "/gallery-details",
  },
  {
    src: GalleryImg2,
    alt: "WPC-Telangana Championship 2", 
    title: "District Championship Meet",
    subtitle: "Regional Competition",
    href: "/gallery-details",
  },
  {
    src: GalleryImg3,
    alt: "WPC-Telangana Championship 3",
    title: "Training Workshop",
    subtitle: "Coaching Seminar",
    href: "/gallery-details",
  },
  {
    src: GalleryImg4,
    alt: "WPC-Telangana Championship 4",
    title: "Award Ceremony",
    subtitle: "Champion Recognition",
    href: "/gallery-details",
  },
  {
    src: GalleryImg5,
    alt: "WPC-Telangana Championship 5",
    title: "Open Powerlifting Meet",
    subtitle: "Community Event",
    href: "/gallery-details",
  },
  {
    src: GalleryImg6,
    alt: "WPC-Telangana Championship 6",
    title: "Referee Certification",
    subtitle: "Official Training",
    href: "/gallery-details",
  },
  {
    src: GalleryImg7,
    alt: "WPC-Telangana Championship 7",
    title: "Youth Championship",
    subtitle: "Junior Category",
    href: "/gallery-details",
  },
  {
    src: GalleryImg9,
    alt: "WPC-Telangana Championship 9",
    title: "Team Federation",
    subtitle: "WPC-Telangana Officials",
    href: "/gallery-details",
  },
];

export default function GalleryOne() {
  // Only show first 6 items for 2x3 grid (removing 3rd row)
  const displayItems = galleryItems.slice(0, 6);

  return (
    <section className="gallery-one">
      <div className="container">
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Event Gallery</span>
          </div>
          <h2 className="section-title__title">
            Celebrating Strength & <br /> Championship Moments
          </h2>
        </div>
        <div className="row">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-4"
            >
              <div className="gallery-one__single">
                <div className="gallery-one__img">
                  <img src={item.src} alt={item.alt} style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }} />
                  <div className="gallery-one__content">
                    <div className="gallery-one__sub-title-box">
                      <div className="gallery-one__sub-title-shape"></div>
                      <p className="gallery-one__sub-title">{item.subtitle}</p>
                    </div>
                    <h4 className="gallery-one__title">
                      <Link to={item.href}>{item.title}</Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {galleryItems.length > 6 && (
          <div className="text-center mt-4">
            <Link to="/gallery" className="thm-btn gallery-one__btn">
              View All Gallery <span className="icon-arrow-right"></span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
