import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Validate form data
  const validateForm = () => {
    const { name, email, phone, message } = formData;
    
    if (!name.trim()) {
      alert('Please enter your name');
      return false;
    }
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    if (!phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    
    if (!message.trim()) {
      alert('Please enter your message');
      return false;
    }
    
    return true;
  };

  // Handle form submission using Web3Forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare form data for Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '9c4fa4e3-7f4a-4f8e-9b2d-1a5e6c8d9f3b'); // Web3Forms access key
      formDataToSend.append('subject', 'New Contact Form Submission - WPC Telangana');
      formDataToSend.append('from_name', formData.name);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('redirect', 'false'); // Don't redirect after submission

      // Send to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        console.log('Email sent successfully');
        setSubmitStatus('success');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: ''
        });
      } else {
        console.error('Email sending failed:', result);
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


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
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      required
                    />
                  </div>
                </div>
                
                <div className="col-xl-12">
                  <div className="contact-one__input-box text-message-box">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <div className="contact-one__btn-box">
                    <button
                      type="submit"
                      className="thm-btn contact-one__btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Now'}
                      <span className="icon-arrow-right"></span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="result">
              {submitStatus === 'success' && (
                <div className="alert alert-success mt-3">
                  <p style={{ color: 'green', marginBottom: '0' }}>
                    ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="alert alert-danger mt-3">
                  <p style={{ color: 'red', marginBottom: '0' }}>
                    ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              )}
            </div>
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
                  <span>Inturi Rekha</span>,{" "}
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






