
'use client'
import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from React Router
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import HeroImg1 from '../../assets/images/resources/main-slider-two-img-1-1.jpg'
import HeroImg2 from '../../assets/images/shapes/main-slider-two-shape-1.png'
import HeroImg3 from '../../assets/images/shapes/main-slider-two-shape-2.png'
import HeroImg4 from '../../assets/images/shapes/main-slider-two-shape-3.png'
import HeroImg5 from '../../assets/images/resources/main-slider-two-img-1-2.jpg'
import HeroImg6 from '../../assets/images/shapes/main-slider-two-shape-1.png'
import HeroImg7 from '../../assets/images/shapes/main-slider-two-shape-2.png'
import HeroImg8 from '../../assets/images/shapes/main-slider-two-shape-3.png'
import HeroImg9 from '../../assets/images/resources/main-slider-two-img-1-3.jpg'

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    pagination: {
    el: "#main-slider-pagination",
    type: "bullets",
    clickable: true
    },
    navigation: {
    nextEl: "#main-slider__swiper-button-next",
    prevEl: "#main-slider__swiper-button-prev"
    },
    autoplay: {
        delay: 8000
    }
}

export default function Banner() {
    return (
       
        <>
        {/* banner-one */}
        <section id="th-home" className="main-slider-two">
            <Swiper {...swiperOptions} className="swiper-container thm-swiper__slider">
            <div className="swiper-wrapper">
            <SwiperSlide className="swiper-slide">
                <div className="container">
                    <div className="row">
                    <div className="col-xl-6">
                        <div className="main-slider-two__content">
                        <p className="main-slider-two__sub-title">The Events</p>
                        <h2 className="main-slider-two__title">
                            Celebrate <br />
                            <span className="color-text">Life's Special</span>
                            <br />
                            Moments
                        </h2>
                        <div className="main-slider-two__btn-box">
                            <Link to="/contact" className="main-slider-two__btn thm-btn">
                                Purchase Ticket <span className="icon-arrow-right"></span>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="main-slider-two__img-box">
                        <div className="main-slider-two__img">
                            <img src={HeroImg1} alt="banner-img" />
                        </div>
                        <div className="main-slider-two__shape-1">
                            <img src={HeroImg2} alt="Shape 1" />
                        </div>
                        <div className="main-slider-two__shape-2">
                            <img src={HeroImg3} alt="Shape 2" />
                        </div>
                        <div className="main-slider-two__shape-3 float-bob-x">
                            <img src={HeroImg4} alt="Shape 3" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <div className="container">
                    <div className="row">
                    <div className="col-xl-6">
                        <div className="main-slider-two__content">
                        <p className="main-slider-two__sub-title">The Events</p>
                        <h2 className="main-slider-two__title">
                            Celebrate <br />
                            <span className="color-text">Life's Special</span>
                            <br />
                            Moments
                        </h2>
                        <div className="main-slider-two__btn-box">
                            <Link to="/contact" className="main-slider-two__btn thm-btn">
                                Purchase Ticket <span className="icon-arrow-right"></span>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="main-slider-two__img-box">
                        <div className="main-slider-two__img">
                            <img src={HeroImg5} alt="Main-mage" />
                        </div>
                        <div className="main-slider-two__shape-1">
                            <img src={HeroImg6} alt="Shape 1" />
                        </div>
                        <div className="main-slider-two__shape-2">
                            <img src={HeroImg7} alt="Shape 2" />
                        </div>
                        <div className="main-slider-two__shape-3 float-bob-x">
                            <img src={HeroImg8} alt="Shape 3" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <div className="container">
                    <div className="row">
                    <div className="col-xl-6">
                        <div className="main-slider-two__content">
                        <p className="main-slider-two__sub-title">The Events</p>
                        <h2 className="main-slider-two__title">
                            Celebrate <br />
                            <span className="color-text">Life's Special</span>
                            <br />
                            Moments
                        </h2>
                        <div className="main-slider-two__btn-box">
                            <Link to="/contact" className="main-slider-two__btn thm-btn">
                                Purchase Ticket <span className="icon-arrow-right"></span>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="main-slider-two__img-box">
                        <div className="main-slider-two__img">
                            <img src={HeroImg9} alt="Main-mage" />
                        </div>
                        <div className="main-slider-two__shape-1">
                            <img src={HeroImg6} alt="Shape 3" />
                        </div>
                        <div className="main-slider-two__shape-2">
                            <img src={HeroImg7} alt="Shape 3" />
                        </div>
                        <div className="main-slider-two__shape-3 float-bob-x">
                            <img src={HeroImg8} alt="Shape 3" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </SwiperSlide>


            </div>
          </Swiper>
          <div className="swiper-pagination" id="main-slider-pagination" />

        </section>
        {/* banner-one */}
      </>
    )
}
