import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Horoscope = () => {
  const [horoscope, setHoroscope] = useState(null);
  const [zodiacSign, setZodiacSign] = useState('aries');  // Default sign, can be changed by the user

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        // Fetch the horoscope data from the backend API
        const response = await axios.get(`http://localhost:5000/api/horoscope/${zodiacSign}`);
        setHoroscope(response.data);
      } catch (error) {
        console.error('Error fetching horoscope:', error);
      }
    };

    fetchHoroscope();
  }, [zodiacSign]);  // Fetch when zodiacSign changes

  return (
    <div>
      <h2>Today's Horoscope</h2>

      <label>
        Choose Zodiac Sign:
        <select onChange={(e) => setZodiacSign(e.target.value)} value={zodiacSign}>
          <option value="aries">Aries</option>
          <option value="taurus">Taurus</option>
          <option value="gemini">Gemini</option>
          <option value="cancer">Cancer</option>
          <option value="leo">Leo</option>
          <option value="virgo">Virgo</option>
          <option value="libra">Libra</option>
          <option value="scorpio">Scorpio</option>
          <option value="sagittarius">Sagittarius</option>
          <option value="capricorn">Capricorn</option>
          <option value="aquarius">Aquarius</option>
          <option value="pisces">Pisces</option>
        </select>
      </label>

      {horoscope ? (
        <div>
          <h3>{horoscope.sunsign} Horoscope</h3>
          <p>{horoscope.description}</p>
        </div>
      ) : (
        <p>Loading horoscope...</p>
      )}
    </div>
  );
};

export default Horoscope;
