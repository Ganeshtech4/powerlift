import React from 'react';
import { Link } from 'react-router-dom';

const ContactMain = () => {


  return (
    <React.Fragment>
      {/*Contact One Start*/}
      <section className="contact-one">
        <div className="container">
          <div className="contact-one__inner">
            <h3 className="contact-one__title">For Any Queries Contact-Us</h3>
            <p className="contact-one__text">
              For your strength journey, we are here to guide, support, and assist you. Whether you have questions about events, memberships, or training, the WPC Powerlifting team is ready to help.
We’re proud to be your trusted platform for all things powerlifting — reach out to us anytime!
            </p>
            <form
              className="contact-form-validated contact-one__form"
              action="assets/inc/sendemail.php"
              method="post"
              noValidate
            >
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="Adress"
                      placeholder="Address"
                      required
                    />
                  </div>
                </div>
                
                <div className="col-xl-12">
                  <div className="contact-one__input-box text-message-box">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <div className="contact-one__btn-box">
                    <button
                      type="submit"
                      className="thm-btn contact-one__btn"
                    >
                      Submit Now<span className="icon-arrow-right"></span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="result"></div>
          </div>
        </div>
      </section>
      {/*Contact One End*/}

      {/*Contact Two Start*/}
      <section className="contact-two">
        <div className="container">
          <div className="row">
            {/* Contact Two Single Start */}
            <div className="col-xl-4 col-lg-4">
              <div className="contact-two__single">
                <div className="contact-two__icon">
                  <span className="icon-pin"></span>
                </div>
                <h3 className="contact-two__title">Location</h3>
                <p className="contact-two__text">
                  #15-104/1, Vandanapuri Colony, Beeramguda, <br /> Sangareddy–502032,Telangana, India
                </p>
              </div>
            </div>
            {/* Contact Two Single End */}

            {/* Contact Two Single Start */}
            <div className="col-xl-4 col-lg-4">
              <div className="contact-two__single">
                <div className="contact-two__icon">
                  <span className="icon-paper-plan"></span>
                </div>
                <h3 className="contact-two__title">E-mail</h3>
                <p className="contact-two__text">
                  <Link to="mailto:powerliftingassociationofts@gmail.com">
                    powerliftingassociationofts@gmail.com
                  </Link>
                </p>
                <p className="contact-two__text">
                  <a href="https://www.instagram.com/wpc_telangana" target="_blank" rel="noopener noreferrer">
                    Instagram: @wpc_telangana
                  </a>
                </p>

              </div>
            </div>
            {/* Contact Two Single End */}

            {/* Contact Two Single Start */}
            <div className="col-xl-4 col-lg-4">
              <div className="contact-two__single">
                <div className="contact-two__icon">
                  <span className="icon-call"></span>
                </div>
                <h3 className="contact-two__title">Contact</h3>
                <p className="contact-two__text">
                  <a href="#">Inturi Rekha</a>,{" "}
                  {/* <a href="tel:017485962546">017485962546</a> */}
                </p>
                <p className="contact-two__text">
                  <a href="tel:7330778111"> 7330778111</a>
                </p>
              </div>
            </div>
            {/* Contact Two Single End */}
          </div>
        </div>
      </section>
      {/*Contact Two End*/}
    </React.Fragment>
  );
};

export default ContactMain;






