"use client"; 
import { useState } from 'react';
import PricingBg from '../../assets/images/shapes/pricing-one-shape-1.png';
import { Link } from 'react-router-dom';

export default function PricingOne () {
  const [activeTab, setActiveTab] = useState('monthly');

  const pricingPlans = {
    monthly: [
      {
        price: 19,
        planName: 'Basic Plan',
        features: [
          'Mistakes To Avoid',
          'Your Startup',
          'Knew About Fonts',
          'Winning Metric for Your Startup',
        ],
      },
      {
        price: 29,
        planName: 'Hard Plan',
        features: [
          'Mistakes To Avoid',
          'Your Startup',
          'Knew About Fonts',
          'Winning Metric for Your Startup',
        ],
      },
      {
        price: 20,
        planName: 'Easy Plan',
        features: [
          'Mistakes To Avoid',
          'Your Startup',
          'Knew About Fonts',
          'Winning Metric for Your Startup',
        ],
      },
    ],
    yearly: [
      {
        price: 30,
        planName: 'Basic Plan',
        features: [
          'Mistakes To Avoid',
          'Your Startup',
          'Knew About Fonts',
          'Winning Metric for Your Startup',
        ],
      },
      {
        price: 80,
        planName: 'Hard Plan',
        features: [
          'Mistakes To Avoid',
          'Your Startup',
          'Knew About Fonts',
          'Winning Metric for Your Startup',
        ],
      },
      {
        price: 50,
        planName: 'Easy Plan',
        features: [
          'Mistakes To Avoid',
          'Your Startup',
          'Knew About Fonts',
          'Winning Metric for Your Startup',
        ],
      },
    ],
  };

  return (
    <section className="pricing-one">
      <div className="container">
        <div className="pricing-one__inner">
          <div className="section-title text-left">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">Pricing</span>
            </div>
            <h2 className="section-title__title section-title__title--two">
              Building Relationships <br /> Driving Results
            </h2>
          </div>
          <div className="pricing-one__main-tab-box tabs-box">
            <ul className="tab-buttons list-unstyled">
              <li
                onClick={() => setActiveTab('monthly')}
                className={`tab-btn ${activeTab === 'monthly' ? 'active-btn' : ''}`}
              >
                <span>Monthly</span>
              </li>
              <li
                onClick={() => setActiveTab('yearly')}
                className={`tab-btn ${activeTab === 'yearly' ? 'active-btn' : ''}`}
              >
                <span>Yearly</span>
              </li>
            </ul>
            <div className="tabs-content">
              {Object.entries(pricingPlans).map(([key, plans]) => (
                <div key={key} className={`tab ${activeTab === key ? 'active-tab' : ''}`} id={key}>
                  <div className="pricing-one__tab-content-box">
                    <div className="row">
                      {plans.map((plan, index) => (
                        <div key={index} className="col-xl-4 col-lg-4 col-md-6">
                          <div className="pricing-one__single">
                            <div className="pricing-one__single-inner">
                              <div className="pricing-one__price-box">
                                <div className="pricing-one__shape-1" style={{ backgroundImage: `url(${PricingBg})` }}></div>
                                <h3 className="pricing-one__price">${plan.price} <span>/mo</span></h3>
                                <p className="pricing-one__pack-name">{plan.planName}</p>
                              </div>
                              <ul className="list-unstyled pricing-one__points">
                                {plan.features.map((feature, index) => (
                                  <li key={index}>
                                    <div className="icon">
                                      <span className="icon-double-angle"></span>
                                    </div>
                                    <div className="text">
                                      <p>{feature}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              <div className="pricing-one__btn-box">
                                <Link to="/pricing" className="pricing-one__btn thm-btn">Purchase now<span className="icon-arrow-right"></span></Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

