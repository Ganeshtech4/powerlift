import slideLogo1 from '../../assets/images/icon/star-icon.png';
export default function SlidingText() {

  return (
    <>
      {/* Sliding Text Start */}
      <section className="sliding-text-one">
          <div className="sliding-text-one__wrap">
          <ul className="sliding-text__list marquee_mode">
              <li>
              <h2 data-hover="Magic of Events" className="sliding-text__title">
                  Magic of Events
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="Celebrate Life" className="sliding-text__title">
                  Celebrate Life
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="Magic of Events" className="sliding-text__title">
                  Magic of Events
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="Celebrate Life" className="sliding-text__title">
                  Celebrate Life
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="Magic of Events" className="sliding-text__title">
                  Magic of Events
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="Celebrate Life" className="sliding-text__title">
                  Celebrate Life
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
          </ul>
          </div>
      </section>
      {/* Sliding Text End */}
    </>
  );
}
