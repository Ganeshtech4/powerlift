"use client"; // Ensure this directive is present

import React from 'react';

// Data for features
const featuresData = [
    {
        id: 1,
        title: 'World Class Speakers',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
        icon: 'fas fa-microphone',
        link: '/team-details',
        delay: '100ms',
    },
    {
        id: 2,
        title: 'Best Experience',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
        icon: 'fas fa-lightbulb',
        link: '/event-details',
        delay: '200ms',
    },
    {
        id: 3,
        title: 'Networking',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
        icon: 'fas fa-network-wired',
        link: '/contact',
        delay: '300ms',
    },
    {
        id: 4,
        title: 'Modern Venue',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
        icon: 'fas fa-calendar-alt',
        link: '/event',
        delay: '400ms',
    },
    {
        id: 5,
        title: 'New People',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
        icon: 'fas fa-users',
        link: '/team',
        delay: '500ms',
    },
    {
        id: 6,
        title: 'Certificates',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
        icon: 'fas fa-graduation-cap',
        link: '/about',
        delay: '600ms',
    },
];

export default function FeatureOne() {
    return (
        <section id="th-services" className="feature-one">
            <div className="container">
                <div className="section-title text-center">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">Features</span>
                    </div>
                    <h2 className="section-title__title">Why should you join <br /> our event</h2>
                </div>
                <div className="row">
                    {featuresData.map((feature) => (
                        <div key={feature.id} className={`col-xl-4 col-lg-6 col-md-6 wow fadeInLeft`} data-wow-delay={feature.delay}>
                            <div className="feature-one__single">
                                <div className="feature-one__icon">
                                    <i className={feature.icon}></i>
                                </div>
                                <div className="feature-one__content">
                                    <h4 className="feature-one__title"><a href={feature.link}>{feature.title}</a></h4>
                                    <p className="feature-one__text">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
