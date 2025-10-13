'use client';
import React from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import galleryImg1 from '../../assets/images/gallery/gallery-2-1.jpg';
import galleryImg2 from '../../assets/images/gallery/gallery-2-2.jpg';
import galleryImg3 from '../../assets/images/gallery/gallery-2-3.jpg';
import galleryImg4 from '../../assets/images/gallery/gallery-2-4.jpg';

const galleryItems = [
    {
        image: galleryImg1,
        title: "Elite Event Management",
        subtitle: "Dream Event",
        link: "gallery-details.html",
    },
    {
        image: galleryImg2,
        title: "Elite Event Management",
        subtitle: "Dream Event",
        link: "gallery-details.html",
    },
    {
        image: galleryImg3,
        title: "Elite Event Management",
        subtitle: "Dream Event",
        link: "gallery-details.html",
    },
    {
        image: galleryImg4,
        title: "Elite Event Management",
        subtitle: "Dream Event",
        link: "gallery-details.html",
    },
    // Duplicates to ensure enough slides for loop
    {
        image: galleryImg1,
        title: "Elite Event Management",
        subtitle: "Dream Event",
        link: "gallery-details.html",
    },
    {
        image: galleryImg2,
        title: "Elite Event Management",
        subtitle: "Dream Event",
        link: "gallery-details.html",
    },
    {
        image: galleryImg3,
        title: "Elite Event Management",
        subtitle: "Dream Event",
        link: "gallery-details.html",
    },
    {
        image: galleryImg4,
        title: "Elite Event Management",
        subtitle: "Dream Event",
        link: "gallery-details.html",
    },
];

export default function GalleryTwo() {
    return (
        <section className="gallery-two">
            <div className="gallery-two__top">
                <div className="container">
                    <div className="gallery-two__top-inner">
                        <div className="section-title text-left">
                            <div className="section-title__tagline-box">
                                <span className="section-title__tagline">Latest Gallery</span>
                            </div>
                            <h2 className="section-title__title section-title__title--two">
                                Making Your Event Celebrate <br />
                                Dreams Come True
                            </h2>
                        </div>
                        <div className="gallery-two__nav">
                            <div className="swiper-button-next1">
                                <i className="icon-angle-left"></i>
                            </div>
                            <div className="swiper-button-prev1">
                                <i className="icon-angle-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallery-two__bottom">
                <div className="container">
                    <div className="gallery-two__carousel-box">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            slidesPerView={1}
                            spaceBetween={0}
                            speed={2000}
                            loop={true}
                            autoplay={{ delay: 9000 }}
                            
                            navigation={{
                                nextEl: '.swiper-button-next1',
                                prevEl: '.swiper-button-prev1',
                            }}
                            breakpoints={{
                                0: { spaceBetween: 0, slidesPerView: 1 },
                                375: { spaceBetween: 0, slidesPerView: 1 },
                                575: { spaceBetween: 0, slidesPerView: 1 },
                                768: { spaceBetween: 30, slidesPerView: 1 }, // Change this to 1
                                992: { spaceBetween: 30, slidesPerView: 2 },
                                1200: { spaceBetween: 30, slidesPerView: 3 },
                                1320: { spaceBetween: 30, slidesPerView: 4 },
                            }}
                        >
                            {galleryItems.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="gallery-two__single">
                                        <div className="gallery-two__img">
                                            <img src={item.image} alt={item.subtitle} />
                                            <div className="gallery-two__content">
                                                <div className="gallery-two__sub-title-box">
                                                    <div className="gallery-two__sub-title-shape"></div>
                                                    <p className="gallery-two__sub-title">{item.subtitle}</p>
                                                </div>
                                                <h4 className="gallery-two__title">
                                                    <a href={item.link}>{item.title}</a>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
