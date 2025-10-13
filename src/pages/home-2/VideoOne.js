"use client";
import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.css';
import videoBg from '../..//assets/images/resources/video-one-img-1.jpg'

export default function VideoOne() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <> 
            {/* Video One Start */}
            <section className="video-one" style={{ position: 'relative', zIndex: 10000 }}>
                <div className="container">
                    <div className="video-one__inner wow fadeInUp" data-wow-delay="300ms">
                        <div className="video-one__img">
                            <img src={videoBg} alt="Video Thumbnail" />
                            <div className="video-one__video-link">
                                <div onClick={openModal} className="video-popup" style={{ cursor: 'pointer', display: 'inline-block' }}>
                                    <div className="video-one__video-icon">
                                        <span className="icon-awesome-play"></span>
                                        <i className="ripple"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ModalVideo Component */}
                <ModalVideo
                    channel="youtube"
                    isOpen={isOpen}
                    videoId="Get7rqXYrbQ"
                    onClose={() => setIsOpen(false)}
                />
            </section>
            {/* Video One End */}
        </>
    );
}
