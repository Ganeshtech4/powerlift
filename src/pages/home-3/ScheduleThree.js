"use client"; // Ensure this directive is present
import scheduleImg1 from '../../assets/images/resources/schedule-three-routine-details-img-1-1.jpg'
import scheduleImg2 from '../../assets/images/resources/schedule-three-routine-details-img-1-2.jpg'
import scheduleImg3 from '../../assets/images/resources/schedule-three-routine-details-img-1-3.jpg'
import scheduleImg4 from '../../assets/images/resources/schedule-three-routine-details-img-1-4.jpg'
import scheduleImg5 from '../../assets/images/resources/schedule-three-routine-details-img-1-5.jpg'
import scheduleImg6 from '../../assets/images/resources/schedule-three-routine-details-img-1-6.jpg'

import React from 'react';

// Data for schedule
const scheduleData = [
    {
        id: 1,
        date: '24 Rd Feb',
        day: 'Sunday',
        title: 'Events That Leave a Impression',
        description: 'A personal portfolio is a curated collection of an individual\'s professional work. birthdays to conferences Events bring people.',
        time: 'From 9:30 to 11:30',
        subTitle: 'Leave a Impression',
        img: [
            scheduleImg1,
            scheduleImg2,
        ],
        link: '/event-details',
        delay: '100ms',
    },
    {
        id: 2,
        date: '26 Th Feb',
        day: 'Monday',
        title: 'Sparkle & Shine on Celebrations',
        description: 'A personal portfolio is a curated collection of an individual\'s professional work. birthdays to conferences Events bring people.',
        time: 'From 12:00 to 1:30',
        subTitle: 'Shine on Celebrations',
        img: [
            scheduleImg3,
            scheduleImg4,
        ],
        link: '/event-details',
        delay: '200ms',
    },
    {
        id: 3,
        date: '29 Th Feb',
        day: 'Tuesday',
        title: 'Sparkle & Shine Events',
        description: 'A personal portfolio is a curated collection of an individual\'s professional work. birthdays to conferences Events bring people.',
        time: 'From 2:00 to 3:30',
        subTitle: 'Shine Events',
        img: [
            scheduleImg5,
            scheduleImg6,
        ],
        link: '/event-details',
        delay: '300ms',
    },
    {
        id: 4,
        date: '29 Th Feb',
        day: 'Tuesday',
        title: 'Join the Festivi Celebrate Events',
        description: 'A personal portfolio is a curated collection of an individual\'s professional work. birthdays to conferences Events bring people.',
        time: 'From 4:00 to 5:30',
        subTitle: 'Festivi Events',
        img: [
            scheduleImg1,
            scheduleImg2,
        ],
        link: '/event-details',
        delay: '400ms',
    },
];

export default function ScheduleThree() {
    return (
        <section id="th-event" className="schedule-three">
            <div className="container">
                <div className="schedule-three__top">
                    <div className="section-title text-left">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">Event Schedule</span>
                        </div>
                        <h2 className="section-title__title">Follow event schedule</h2>
                    </div>
                    <div className="schedule-three__time-box">
                        {scheduleData.map((event) => (
                            <div key={event.id} className="schedule-three__time-info-box">
                                <div className="schedule-three__time-info-box-content">
                                    <h4>{event.date}</h4>
                                    <p>{event.day}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="schedule-three__bottom">
                    {scheduleData.map((event) => (
                        <div key={event.id} className={`schedule-three__routine-details wow fadeInLeft`} data-wow-delay={event.delay}>
                            <div className="schedule-three__routine-details-description">
                                <h4 className="schedule-three__routine-details-description-title">
                                    <a href={event.link}>{event.title}</a>
                                </h4>
                                <p className="schedule-three__routine-details-description-text">{event.description}</p>
                                <a href={event.link} className="schedule-three__routine-details-description-btn">Learn More</a>
                            </div>
                            <div className="schedule-three__routine-details-img-box">
                                {event.img.map((image, index) => (
                                    <div key={index} className="schedule-three__routine-details-img-single">
                                        <img src={image} alt={`Schedule ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="schedule-three__routine-time-detail">
                                <p>{event.time}</p>
                                <h6>{event.subTitle}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
