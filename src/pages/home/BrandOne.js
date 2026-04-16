import React, { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { fetchPartnerships } from '../../utils/partnershipApi';



// Swiper options
const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 30,
  speed: 2000,
  autoplay: {
    delay: 900,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev1',
  },
  pagination: {
    el: '.swiper-dot-style1',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    0: {
      spaceBetween: 0,
      slidesPerView: 1,
    },
    375: {
      spaceBetween: 30,
      slidesPerView: 1,
    },
    575: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    768: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 4,
    },
    1200: {
      spaceBetween: 30,
      slidesPerView: 5,
    },
    1320: {
      spaceBetween: 30,
      slidesPerView: 5,
    },
  },
};

export default function BrandOne() {
  const [partnerships, setPartnerships] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadPartnerships = async () => {
      try {
        const data = await fetchPartnerships();
        if (isMounted) {
          setPartnerships(data.filter((item) => item.logoUrl));
        }
      } catch (error) {
        if (isMounted) {
          setPartnerships([]);
        }
      }
    };

    loadPartnerships();

    return () => {
      isMounted = false;
    };
  }, []);

  if (partnerships.length === 0) {
    return null;
  }

  return (
      <section className="brand-one">
        <div className="container">
          <h2 className="ourcollaborations">Our Collaborations</h2>
          <Swiper {...swiperOptions}>
            {partnerships.map((brand) => (
              <SwiperSlide key={brand.id}>
                <div className="brand-one__single">
                  <div className="brand-one__img">
                    <img src={brand.logoUrl} alt={brand.title} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
  );
}
