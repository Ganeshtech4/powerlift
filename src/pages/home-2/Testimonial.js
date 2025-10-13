'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import testimonialImg1 from '../../assets/images/testimonial/testimonial-one-client-1-1.jpg'
import testimonialImg2 from '../../assets/images/testimonial/testimonial-one-client-1-2.jpg'
import testimonialImg3 from '../../assets/images/testimonial/testimonial-one-client-1-3.jpg'
import testimonialImg4 from '../../assets/images/testimonial/testimonial-one-client-1-4.jpg'
import { Link } from "react-router-dom"


const testimonials = [
    {
        name: "Jonathon Doe",
        role: "Officer",
        text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
        image: testimonialImg1
    },
    {
        name: "Jonathon Cample",
        role: "Designer",
        text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
        image: testimonialImg2
    },
    {
        name: "Jonathon Trot",
        role: "Officer",
        text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
        image: testimonialImg3
    },
    {
        name: "Jonathon Smith",
        role: "Designer",
        text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
        image: testimonialImg4
    },
];

export default function Testimonial() {
    const enableLoop = testimonials.length > 2; // Enable loop if there are more than 2 slides

    return (
        <section id="th-testimonials" className="testimonial-one">
            <div className="container">
                <div className="section-title text-center">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">Clients Testimonial</span>
                    </div>
                    <h2 className="section-title__title section-title__title--two">
                        They often involve activities <br /> such as performances
                    </h2>
                </div>
                <div className="testimonial-one__carousel-box">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        slidesPerView={1}
                        spaceBetween={0}
                        speed={2000}
                        loop={enableLoop} // Conditionally enable loop
                        autoplay={{ delay: 9000 }}
                        pagination={{
                            el: ".swiper-dot-style1",
                            type: "bullets",
                            clickable: true
                        }}
                        navigation={{
                            nextEl: '.swiper-button-prev1',
                            prevEl: '.swiper-button-next1',
                        }}
                        breakpoints={{
                            0: { spaceBetween: 0, slidesPerView: 1 },
                            375: { spaceBetween: 0, slidesPerView: 1 },
                            575: { spaceBetween: 0, slidesPerView: 1 },
                            768: { spaceBetween: 30, slidesPerView: 2 },
                            992: { spaceBetween: 30, slidesPerView: 2 },
                            1200: { spaceBetween: 30, slidesPerView: 2 },
                            1320: { spaceBetween: 30, slidesPerView: 2 },
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial-one__single">
                                    <div className="testimonial-one__client-info-and-review">
                                        <div className="testimonial-one__client-info">
                                            <div className="testimonial-one__client-img">
                                                <img src={testimonial.image} alt={testimonial.name} />
                                            </div>
                                            <div className="testimonial-one__client-content">
                                                <h4 className="testimonial-one__client-name">
                                                    <Link to="/testimonials">{testimonial.name}</Link>
                                                </h4>
                                                <p className="testimonial-one__sub-title">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="testimonial-one__review">
                                            {[...Array(4)].map((_, i) => (
                                                <span className="icon-star" key={i}></span>
                                            ))}
                                            <span className="icon-star clr-start"></span>
                                        </div>
                                    </div>
                                    <p className="testimonial-one__text">{testimonial.text}</p>
                                    <div className="testimonial-one__quote">
                                        <span className="icon-quote"></span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="testimonial-one__nav">
                        <div className="swiper-button-next1">
                            <i className="icon-angle-left"></i>
                        </div>
                        <div className="swiper-button-prev1">
                            <i className="icon-angle-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
