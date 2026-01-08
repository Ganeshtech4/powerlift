import slideLogo1 from '../../assets/images/icon/star-icon.png';
export default function SlidingText() {

  return (
    <>
      {/* Sliding Text Start */}
      <section className="sliding-text-one">
          <div className="sliding-text-one__wrap">
          <ul className="sliding-text__list marquee_mode">
              <li>
              <h2 data-hover="WPC Telangana" className="sliding-text__title">
                  WPC Telangana
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="Power Lifting" className="sliding-text__title">
                  Power Lifting
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="WPC Telangana" className="sliding-text__title">
                  WPC Telangana
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="Power Lifting" className="sliding-text__title">
                  Power Lifting
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="WPC Telangana" className="sliding-text__title">
                  WPC Telangana
                  <img src={slideLogo1} alt="Star Icon" />
              </h2>
              </li>
              <li>
              <h2 data-hover="Power Lifting" className="sliding-text__title">
                  Power Lifting
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
