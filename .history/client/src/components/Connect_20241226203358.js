import React, { useState, useEffect } from 'react';
import './Connect.css';

function AboutUs() {
  // Bio about the creator
  const bio = "Hi, I'm Prachi, the creator of this site. I developed this platform to help people connect, share experiences anonymously, and find meaningful relationships. My goal is to create a positive and engaging space for everyone. I hope you enjoy using this app!";
  
  // Google Maps URL (replace with your own location)
  const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.097219530184!2d72.87402621474682!3d19.03039248769854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8f4536b1e0b%3A0xd26f1ab9a6c2ec8e!2sVeermata%20Jijabai%20Technological%20Institute%20(VJTI)!5e0!3m2!1sen!2sin!4v1672180995631!5m2!1sen!2sin";


  return (
    <div className="about-us">
      <h2>About Us</h2>
      
      {/* Bio Section */}
      <section className="bio">
        <h3>About the Creator</h3>
        <p>{bio}</p>
      </section>

      {/* Google Maps Section */}
      <section className="google-maps">
        <h3>Find Us Here</h3>
        <div className="map-container">
          <iframe
            title="Google Maps Location"
            src={googleMapsUrl}
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="contact">
        <h3>Contact Info</h3>
        <p>Email: ppdwivedi_mc24@mc.vjti.ac.in</p>
      </section>
    </div>
  );
}

export default AboutUs;
