// components/CounterOne.js
"use client"; // Ensure this directive is present

import { useEffect, useState } from 'react';
// data/counterData.js
export const counterData = {
    title: 'Count Every Second Until The Event',
    buttonText: 'Buy Ticket',
    buttonLink: '#',
    countdownDate: '2025/08/01', // Format: YYYY/MM/DD
  };
  

export default function CounterOne() {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date(counterData.countdownDate).getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown-one">
      <div className="container">
        <div className="countdown-one__inner wow fadeInUp" data-wow-delay="300ms">
          <div className="countdown-one__top">
            <h3 className="countdown-one__title">{counterData.title}</h3>
            <div className="countdown-one__btn-box">
              <a href={counterData.buttonLink} className="countdown-one__btn thm-btn">
                {counterData.buttonText}<span className="icon-arrow-right"></span>
              </a>
            </div>
          </div>
          <div className="countdown-one__bottom">
            <div className="countdown-one__countdown-timer-box">
              <div className="countdown time-countdown-one" data-countdown-time={counterData.countdownDate}>
                  <div>
                    <div className="box">
                      <span className="days">{timeRemaining.days}</span>
                      <span className="timeRef">Days</span>
                    </div>
                  </div>
                  <div>
                    <div className="box">
                      <span className="hours">{timeRemaining.hours}</span>
                      <span className="timeRef clr-1">Hours</span>
                    </div>
                  </div>
                  <div>
                    <div className="box">
                      <span className="minutes">{timeRemaining.minutes}</span>
                      <span className="timeRef clr-2">Minutes</span>
                    </div>
                  </div>
                  <div>
                    <div className="box">
                      <span className="seconds">{timeRemaining.seconds}</span>
                      <span className="timeRef clr-3">Seconds</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
