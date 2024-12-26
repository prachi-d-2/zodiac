import React, { useState, useEffect } from 'react';
import './Connect.css';

function AboutUs() {
  // Bio about the creator
  const bio = "Hi, I'm Prachi, the creator of this site. I developed this platform to help people connect, share experiences anonymously, and find meaningful relationships. My goal is to create a positive and engaging space for everyone. I hope you enjoy using this app!";
  
  // Google Maps URL (replace with your own location)
  const googleMapsUrl = "const googleMapsUrl = "https://www.google.com/maps?q=VJTI,Mumbai";
";

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
