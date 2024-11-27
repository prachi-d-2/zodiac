import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'Understanding Zodiac Compatibility',
      content: `When it comes to relationships, love, and attraction, we often turn to the stars to uncover the mysteries of human connection. Whether you're a fiery Aries or a peaceful Pisces, your zodiac sign might hold the key to understanding how you relate to others — especially in love. But does your sign really determine your compatibility with others, or is it all just cosmic nonsense? Let’s explore the enchanting world of zodiac compatibility and uncover how the stars might actually influence the way we connect.

#### The Basics: The 12 Zodiac Signs and Their Elements

Before we dive into the mystical world of compatibility, it's important to understand the elemental influences of the zodiac signs. Each of the 12 signs belongs to one of four elements: **Fire, Earth, Air, and Water**. These elements provide the foundation for understanding how signs interact with each other in relationships.

1.  **Fire Signs (Aries, Leo, Sagittarius)**: Passionate, energetic, and spontaneous, Fire signs are natural leaders. They bring excitement to relationships, though sometimes their impulsiveness can spark a little too much drama.
    
2.  **Earth Signs (Taurus, Virgo, Capricorn)**: Grounded, practical, and reliable, Earth signs prefer stability and security. They are the builders of the zodiac, bringing a sense of calm and structure to relationships.
    
3.  **Air Signs (Gemini, Libra, Aquarius)**: Intellectual, curious, and communicative, Air signs thrive on conversation and mental connection. They bring a refreshing breeze of novelty and creativity, but sometimes they can be too detached or unpredictable.
    
4.  **Water Signs (Cancer, Scorpio, Pisces)**: Intuitive, emotional, and empathetic, Water signs feel deeply and connect on an emotional level. They bring depth and sensitivity to relationships, but their moods can shift like the tides.

#### Fire and Air: A Match Made in the Sky

When it comes to **Fire** and **Air**, think of a candle lit on a windy day. Air fans the flames, making them burn brighter and stronger. This combination often results in an exciting and passionate relationship, full of creativity and enthusiasm.

- **Aries (Fire) + Gemini (Air)**: Aries' daring spirit combined with Gemini's curiosity creates a whirlwind of fun and adventure. Together, they’re a power duo, constantly exploring new horizons.
- **Leo (Fire) + Libra (Air)**: A regal Leo with the charming Libra? Pure magic. Leo’s boldness is tempered by Libra’s diplomatic nature, making for a relationship that’s both glamorous and harmonious.
- **Sagittarius (Fire) + Aquarius (Air)**: This pairing is a cosmic adventure waiting to happen! Sagittarius loves exploring new philosophies and ideas, while Aquarius brings unique and innovative thinking.

#### Earth and Water: Deep and Steady

Now, let’s talk about **Earth** and **Water**. Earth signs are stable, reliable, and practical, while Water signs are intuitive, emotional, and nurturing. When combined, these elements can create a relationship built on deep emotional understanding and mutual care.

- **Taurus (Earth) + Cancer (Water)**: This is one of the most nurturing pairings. Taurus, ruled by Venus, brings a deep love for sensuality and material comforts, while Cancer thrives on emotional connection and family bonds.
- **Virgo (Earth) + Scorpio (Water)**: Virgo and Scorpio bring intensity and focus to a relationship. Virgo’s attention to detail and Scorpio’s passionate nature create a bond that’s both intellectual and emotionally deep.
- **Capricorn (Earth) + Pisces (Water)**: A dreamy Pisces combined with the practical Capricorn makes for an interesting pairing. While Pisces brings intuition and creativity, Capricorn grounds them with structure and determination.

#### The Challenges: When Elements Collide

While the above combinations often work well, not every zodiac pairing is a cosmic match made in heaven. Sometimes, elements clash, creating friction that may be difficult to resolve. Let’s explore some potentially challenging combinations.

- **Fire + Water**: Fire and Water are opposite forces. While Fire seeks excitement and action, Water craves emotional depth and introspection.
- **Earth + Air**: Earth signs seek stability, while Air signs crave variety and mental stimulation. This can lead to a mismatch in priorities.

#### Cosmic Chemistry: Does the Zodiac Really Matter?

Zodiac compatibility can offer fascinating insights into how we connect with others, but successful relationships are built on communication, trust, and mutual respect. That said, if you feel a deep connection with someone who shares your element or opposites attract in unexpected ways, the stars might just be giving you a cosmic nudge.

#### Conclusion: Love Across the Stars

Whether your cosmic match is written in the stars or you’ve found someone who defies all expectations, the most important thing is to nurture your relationships with kindness, patience, and understanding.`
    },
    {
      id: 2,
      title: 'The Art of Astrology Dating',
      content: 'Astrology can offer unique insights into your love life. Here are some tips on finding love through astrology... (full article continues)',
    },
    {
      id: 3,
      title: 'Best Practices for Online Zodiac Dating',
      content: 'Online zodiac dating can be a fun and safe way to meet like-minded individuals. Here are some best practices... (full article continues)',
    },
  ];

  const handleCardClick = (article) => {
    setSelectedArticle(article); // Display the full article
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

      {selectedArticle && (
        <div className="article-detail">
          <h1>{selectedArticle.title}</h1>
          <p>{selectedArticle.content}</p> {/* Display full content */}
          <button onClick={() => setSelectedArticle(null)}>Close</button> {/* Close the article */}
        </div>
      )}
    </div>
  );
}

export default Home;
