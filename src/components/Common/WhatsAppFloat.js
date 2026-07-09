import React from 'react';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
  const phoneNumber = '917330778111'; // India country code + number
  const whatsappURL = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppFloat;
