import React from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

// Images served from public folder - using process.env.PUBLIC_URL for compatibility
const publicUrl = process.env.PUBLIC_URL || '';
const BannerImg = `${publicUrl}/images/slider/hero1.jpg`;
const BannerImg2 = `${publicUrl}/images/slider/hero2.jpg`;
const BannerImg3 = `${publicUrl}/images/slider/hero3.jpg`;

// Shape images from public folder
const BannerShape1 = `${publicUrl}/images/shapes/main-slider-shape-1.png`;
const BannerShape2 = `${publicUrl}/images/shapes/main-slider-shape-2.png`;
const BannerShape3 = `${publicUrl}/images/shapes/main-slider-star-1.png`;
const BannerShape4 = `${publicUrl}/images/shapes/main-slider-star-2.png`;
const BannerShape5 = `${publicUrl}/images/shapes/main-slider-star-3.png`;


const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation, EffectFade],
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  pagination: {
    el: '#main-slider-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '#main-slider__swiper-button-next',
    prevEl: '#main-slider__swiper-button-prev'
  },
  autoplay: {
    delay: 10000
  }
}

export default function Banner() {
  return (
    <>
      {/* banner-one */}
      <section
        id="th-home"
        className="main-slider"
        style={{ marginTop: "0", paddingTop: "0" }}
      >

        <Swiper {...swiperOptions} className="swiper-container thm-swiper__slider">
          <div className="swiper-wrapper">
            <SwiperSlide className="swiper-slide">
              <div className="main-slider__bg-overlay"></div>
              <div className="main-slider__img">
                <img src={BannerImg} alt="WPC Telangana Banner" />
              </div>
              <div className="main-slider__shpae-1">
                <img src={BannerShape1} alt="" />
              </div>
              <div className="main-slider__shpae-2">
                <img src={BannerShape2} alt="" />
              </div>
              <div className="main-slider__start-1">
                <img src={BannerShape3} alt="" />
              </div>
              <div className="main-slider__start-2 zoominout">
                <img src={BannerShape4} alt="" />
              </div>
              <div className="main-slider__start-3">
                <img src={BannerShape5} alt="" />
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="main-slider__content">
                      <p className="main-slider__sub-title">WPC – Telangana State</p>
                      <h2 className="main-slider__title">
                        Welcome to <br /> <span>WPC–Telangana!</span>
                      </h2>
                      <p className="main-slider__text">
                        We are the official state federation under WPC–India, dedicated to promoting the sport of <br />
                        Powerlifting in Telangana. <br />
                        Our mission is to build a community of strong, disciplined athletes and to provide every lifter <br /> — from beginners to professionals — the opportunity to compete on district, state, national, <br /> and international stages. <br />
                        Join the Movement of Strength, Discipline & Glory.
                      </p>
                      <br />
                      <div className="main-slider__btn-box">
                        <Link to="/about" className="main-slider__btn thm-btn">
                          About Us
                          <span className="icon-arrow-right"></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="main-slider__bg-overlay"></div>
              <div className="main-slider__img">
                <img src={BannerImg2} alt="Building Champions Banner" />
              </div>
              <div className="main-slider__shpae-1">
                <img src={BannerShape1} alt="" />
              </div>
              <div className="main-slider__shpae-2">
                <img src={BannerShape2} alt="" />
              </div>
              <div className="main-slider__start-1">
                <img src={BannerShape3} alt="" />
              </div>
              <div className="main-slider__start-2 zoominout">
                <img src={BannerShape4} alt="" />
              </div>
              <div className="main-slider__start-3">
                <img src={BannerShape5} alt="" />
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="main-slider__content">
                      <p className="main-slider__sub-title">World Powerlifting Congress</p>
                      <h2 className="main-slider__title">
                        Building Champions <br /> <span>Across Telangana</span>
                      </h2>
                      <p className="main-slider__text">
                        We organize and regulate Powerlifting, Bench Press, and Deadlift championships under <br />
                        international standards. <br />
                        Our goal is to inspire athletes, promote strength sports in Telangana, and create transparent <br />
                        pathways for lifters to reach national and international competitions. <br />
                        Join the Movement of Strength, Discipline & Glory.
                      </p>
                      <br />
                      <div className="main-slider__btn-box">
                        <Link to="/team" className="main-slider__btn thm-btn">
                          Join Membership
                          <span className="icon-arrow-right"></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="main-slider__bg-overlay"></div>
              <div className="main-slider__img">
                <img src={BannerImg3} alt="International Competition Banner" />
              </div>
              <div className="main-slider__shpae-1">
                <img src={BannerShape1} alt="" />
              </div>
              <div className="main-slider__shpae-2">
                <img src={BannerShape2} alt="" />
              </div>
              <div className="main-slider__start-1">
                <img src={BannerShape3} alt="" />
              </div>
              <div className="main-slider__start-2 zoominout">
                <img src={BannerShape4} alt="" />
              </div>
              <div className="main-slider__start-3">
                <img src={BannerShape5} alt="" />
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="main-slider__content">
                      <p className="main-slider__sub-title">Recognized by WPC–India</p>
                      <h2 className="main-slider__title">
                        Compete on <br /> <span>International Stage</span>
                      </h2>
                      <p className="main-slider__text">
                        To empower Telangana athletes by providing them with structured training, fair competition, <br />
                        and international recognition under WPC regulations. <br />
                        Our vision is to make Telangana one of India's strongest and most successful states <br />
                        in the sport of powerlifting — both in medals and mindset. <br />
                        Join the Movement of Strength, Discipline & Glory.
                      </p>
                      <br />
                      <div className="main-slider__btn-box">
                        <Link to="/event" className="main-slider__btn thm-btn">
                          View Championships <span className="icon-arrow-right" />
                        </Link>
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

  );
}






// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import BannerImg from "../../assets/images/resources/main-slider-1.jpg";
// import BannerImg2 from "../../assets/images/resources/main-slider-2.jpg";
// import BannerImg3 from "../../assets/images/resources/main-slider-3.jpg";

// const swiperOptions = {
//   modules: [Autoplay, Pagination, Navigation],
//   slidesPerView: 1,
//   loop: true,
//   effect: 'fade',
//   pagination: {
//     el: '#main-slider-pagination',
//     type: 'bullets',
//     clickable: true,
//   },
//   navigation: {
//     nextEl: '#main-slider__swiper-button-next',
//     prevEl: '#main-slider__swiper-button-prev',
//   },
//   autoplay: {
//     delay: 10000,
//   },
// };

// export default function Banner() {
//   return (
//     <section id="th-home" className="main-slider" style={{ marginTop: 0, paddingTop: 0 }}>
//       <Swiper {...swiperOptions} className="swiper-container thm-swiper__slider">

//         {/* Slide 1 */}
//         <SwiperSlide>
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-lg-6 col-md-12">
//                 <p className="main-slider__sub-title">WPC – Telangana State</p>
//                 <h2 className="main-slider__title">
//                   Welcome to <span>WPC–Telangana!</span>
//                 </h2>
//                 <p className="main-slider__text">
//                   We are the official state federation under WPC–India, dedicated to promoting the sport of Powerlifting in Telangana.<br />
//                   Our mission is to build a community of strong, disciplined athletes and provide every lifter the opportunity to compete.<br />
//                   Join the Movement of Strength, Discipline & Glory.
//                 </p>
//                 <div className="main-slider__btn-box">
//                   <Link to="/about" className="main-slider__btn thm-btn">
//                     About Us <span className="icon-arrow-right"></span>
//                   </Link>
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-12">
//                 <img src={BannerImg} alt="" className="img-fluid" />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* Slide 2 */}
//         <SwiperSlide>
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-lg-6 col-md-12">
//                 <p className="main-slider__sub-title">World Powerlifting Congress</p>
//                 <h2 className="main-slider__title">
//                   Building Champions <span>Across Telangana</span>
//                 </h2>
//                 <p className="main-slider__text">
//                   We organize and regulate Powerlifting, Bench Press, and Deadlift championships under international standards.<br />
//                   Our goal is to inspire athletes, promote strength sports in Telangana, and create transparent pathways for lifters.<br />
//                   Join the Movement of Strength, Discipline & Glory.
//                 </p>
//                 <div className="main-slider__btn-box">
//                   <Link to="/team" className="main-slider__btn thm-btn">
//                     Join Membership <span className="icon-arrow-right"></span>
//                   </Link>
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-12">
//                 <img src={BannerImg2} alt="" className="img-fluid" />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* Slide 3 */}
//         <SwiperSlide>
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-lg-6 col-md-12">
//                 <p className="main-slider__sub-title">Recognized by WPC–India</p>
//                 <h2 className="main-slider__title">
//                   Compete on <span>International Stage</span>
//                 </h2>
//                 <p className="main-slider__text">
//                   To empower Telangana athletes by providing structured training, fair competition, and international recognition.<br />
//                   Our vision is to make Telangana one of India's strongest and most successful states in powerlifting.<br />
//                   Join the Movement of Strength, Discipline & Glory.
//                 </p>
//                 <div className="main-slider__btn-box">
//                   <Link to="/event" className="main-slider__btn thm-btn">
//                     View Championships <span className="icon-arrow-right" />
//                   </Link>
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-12">
//                 <img src={BannerImg3} alt="" className="img-fluid" />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//       </Swiper>
//       <div className="swiper-pagination" id="main-slider-pagination" />
//     </section>
//   );
// }
