import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: 'Understanding Zodiac Compatibility',
      content: `
      When it comes to relationships, love, and attraction, we often turn to the stars to uncover the mysteries of human connection. Whether you're a fiery Aries or a peaceful Pisces, your zodiac sign might hold the key to understanding how you relate to others — especially in love. But does your sign really determine your compatibility with others, or is it all just cosmic nonsense? Let’s explore the enchanting world of zodiac compatibility and uncover how the stars might actually influence the way we connect.

      <h2>The Basics: The 12 Zodiac Signs and Their Elements</h2>
      <p>Before we dive into the mystical world of compatibility, it's important to understand the elemental influences of the zodiac signs. Each of the 12 signs belongs to one of four elements: <strong>Fire, Earth, Air, and Water</strong>. These elements provide the foundation for understanding how signs interact with each other in relationships.</p>

      <ul>
        <li><strong>Fire Signs (Aries, Leo, Sagittarius):</strong> Passionate, energetic, and spontaneous, Fire signs are natural leaders. They bring excitement to relationships, though sometimes their impulsiveness can spark a little too much drama.</li>
        <li><strong>Earth Signs (Taurus, Virgo, Capricorn):</strong> Grounded, practical, and reliable, Earth signs prefer stability and security. They are the builders of the zodiac, bringing a sense of calm and structure to relationships.</li>
        <li><strong>Air Signs (Gemini, Libra, Aquarius):</strong> Intellectual, curious, and communicative, Air signs thrive on conversation and mental connection. They bring a refreshing breeze of novelty and creativity, but sometimes they can be too detached or unpredictable.</li>
        <li><strong>Water Signs (Cancer, Scorpio, Pisces):</strong> Intuitive, emotional, and empathetic, Water signs feel deeply and connect on an emotional level. They bring depth and sensitivity to relationships, but their moods can shift like the tides.</li>
      </ul>

      <h3>Fire and Air: A Match Made in the Sky</h3>
      <p>When it comes to Fire and Air, think of a candle lit on a windy day. Air fans the flames, making them burn brighter and stronger. This combination often results in an exciting and passionate relationship, full of creativity and enthusiasm.</p>

      <p><strong>Aries (Fire) + Gemini (Air):</strong> Aries' daring spirit combined with Gemini's curiosity creates a whirlwind of fun and adventure. Together, they’re a power duo, constantly exploring new horizons.</p>
      <p><strong>Leo (Fire) + Libra (Air):</strong> A regal Leo with the charming Libra? Pure magic. Leo’s boldness is tempered by Libra’s diplomatic nature, making for a relationship that’s both glamorous and harmonious.</p>
      <p><strong>Sagittarius (Fire) + Aquarius (Air):</strong> This pairing is a cosmic adventure waiting to happen! Sagittarius loves exploring new philosophies and ideas, while Aquarius brings unique and innovative thinking.</p>

      <h3>Earth and Water: Deep and Steady</h3>
      <p>Earth and Water are a perfect pairing. Earth signs are stable, reliable, and practical, while Water signs are intuitive, emotional, and nurturing. When combined, these elements can create a relationship built on deep emotional understanding and mutual care.</p>

      <p><strong>Taurus (Earth) + Cancer (Water):</strong> This is one of the most nurturing pairings. Taurus, ruled by Venus, brings a deep love for sensuality and material comforts, while Cancer thrives on emotional connection and family bonds.</p>
      <p><strong>Virgo (Earth) + Scorpio (Water):</strong> Virgo and Scorpio bring intensity and focus to a relationship. Virgo’s attention to detail and Scorpio’s passionate nature create a bond that’s both intellectual and emotionally deep.</p>
      <p><strong>Capricorn (Earth) + Pisces (Water):</strong> A dreamy Pisces combined with the practical Capricorn makes for an interesting pairing. While Pisces brings intuition and creativity, Capricorn grounds them with structure and determination.</p>

      <h2>The Challenges: When Elements Collide</h2>
      <p>While the above combinations often work well, not every zodiac pairing is a cosmic match made in heaven. Sometimes, elements clash, creating friction that may be difficult to resolve. Let’s explore some potentially challenging combinations:</p>

      <ul>
        <li><strong>Fire + Water:</strong> Fire and Water are opposite forces. While Fire seeks excitement and action, Water craves emotional depth and introspection.</li>
        <li><strong>Earth + Air:</strong> Earth signs seek stability, while Air signs crave variety and mental stimulation. This can lead to a mismatch in priorities.</li>
      </ul>

      <h2>Cosmic Chemistry: Does the Zodiac Really Matter?</h2>
      <p>Zodiac compatibility can offer fascinating insights into how we connect with others, but successful relationships are built on communication, trust, and mutual respect. That said, if you feel a deep connection with someone who shares your element or opposites attract in unexpected ways, the stars might just be giving you a cosmic nudge.</p>

      <h2>Conclusion: Love Across the Stars</h2>
      <p>Whether your cosmic match is written in the stars or you’ve found someone who defies all expectations, the most important thing is to nurture your relationships with kindness, patience, and understanding.</p>
      `,
    },
    {
      id: 2,
      title: 'The Art of Astrology Dating',
      content: `
      Ah, the age-old question: “How do I find love in a world full of swipes, likes, and endless options?” Fear not, dear reader, because the stars might just have the answer for you. Astrology dating is not only about finding someone who shares your passion for the zodiac — it’s about finding someone whose stars align with yours in all the right ways. So, if you're tired of the same old dating apps and looking for something a bit more cosmic, let’s dive into the art of astrology dating.

      <h2>Know Your Sign, Know Your Needs</h2>
      <p>Before you can even think about finding a compatible match, you need to get to know your own zodiac sign. Are you an adventurous Aries who needs excitement in every moment, or a laid-back Taurus who loves the comfort of routine? Understanding your sun sign is the first step toward knowing what you need in a partner.</p>

      <h2>Matchmaker, Matchmaker, Make Me a Match</h2>
      <p>Once you’ve figured out your own needs, it’s time to look at potential partners. Here are some tips for navigating astrology-based dating:</p>

      <ul>
        <li><strong>Fire signs (Aries, Leo, Sagittarius):</strong> Best paired with Air signs (Gemini, Libra, Aquarius) for an energetic, adventure-filled match.</li>
        <li><strong>Earth signs (Taurus, Virgo, Capricorn):</strong> Naturally drawn to Water signs (Cancer, Scorpio, Pisces), as both crave stability and emotional depth.</li>
        <li><strong>Air signs (Gemini, Libra, Aquarius):</strong> Best with other Air signs or Fire signs, whose intellectual nature thrives on stimulation and conversation.</li>
        <li><strong>Water signs (Cancer, Scorpio, Pisces):</strong> Seek Earth signs who can help them stay grounded or fellow Water signs who understand their emotional world.</li>
      </ul>

      <h2>Dating Tips for Each Sign</h2>
      <p>Here are some tips tailored to your zodiac sign:</p>

      <ul>
        <li><strong>Aries:</strong> Keep things exciting! Don’t settle for a predictable date.</li>
        <li><strong>Taurus:</strong> Romance is your game. Plan a cozy, pampering evening.</li>
        <li><strong>Gemini:</strong> Keep it interesting with conversation and variety.</li>
        <li><strong>Cancer:</strong> A sentimental date with deep emotional connection.</li>
        <li><strong>Leo:</strong> Go big with a lavish, memorable date.</li>
        <li><strong>Virgo:</strong> Thoughtful details and a meaningful experience will win you over.</li>
        <li><strong>Libra:</strong> Balance elegance with fun for an ideal date.</li>
        <li><strong>Scorpio:</strong> Dive deep with an intriguing and mysterious outing.</li>
        <li><strong>Sagittarius:</strong> An adventurous and spontaneous date will thrill you.</li>
        <li><strong>Capricorn:</strong> A sophisticated, well-planned evening works best for you.</li>
        <li><strong>Aquarius:</strong> A date that’s unconventional and thought-provoking.</li>
        <li><strong>Pisces:</strong> A dreamy, creative experience filled with art or music.</li>
      </ul>
      `,
    },
    {
      id: 3,
      title: 'Best Practices for Online Zodiac Dating',
      content: `
      Online zodiac dating can be a fun and safe way to meet like-minded individuals. Here's a guide to getting the most out of your online cosmic matchmaking experience.

      <h2>Choose the Right Platform</h2>
      <p>Look for platforms that let you explore compatibility based on your astrological chart, not just your sun sign. Sites that integrate astrology-based matchmaking or horoscope readings can provide a deeper connection.</p>

      <h2>Your Profile: Cosmic Clarity</h2>
      <p>Be clear about who you are astrologically! List not just your sun sign, but your moon and rising signs as well. This creates a fuller, more authentic profile.</p>

      <h2>Cosmic Communication: Navigating Conversations</h2>
      <p>Break the ice by discussing astrology! Asking about someone's moon and rising signs can lead to deeper conversations about your shared compatibility.</p>

      <h2>Understanding Compatibility</h2>
      <p>Astrology can give you insights into potential challenges and strengths in your relationships. Use it as a guide, but remember — no match is purely made by the stars.</p>

      <h2>Conclusion</h2>
      <p>Online zodiac dating offers a fun and insightful way to meet new people, but ultimately, real connections are about understanding, respect, and communication. Let the stars guide you, but keep your feet on the ground.</p>
      `,
    },
  ];

  const handleCardClick = (article) => {
    navigate('/article', { state: article }); // Passing article data to the new page
  };

  return (
    <div className="home-container">
      <div className="welcome-banner">
        <h1>Welcome to Zodiac Connect</h1>
        <p>Discover love through the stars. Connect with people who share your zodiac sign and explore compatibility!</p>
        <button className="get-started-button">Get Started</button>
      </div>
      <div className="content-section">
        {articles.map((article) => (
          <div
            key={article.id}
            className="content-card"
            onClick={() => handleCardClick(article)}
          >
            <h2>{article.title}</h2>
            <p>{article.content.substring(0, 100)}...</p> {/* Display first 100 characters */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
