import React, { useState } from 'react';
import './CardSwiper.css'; // Import the CSS for stylings
import axios from 'axios';

// Types for our content
type CardType = 'joke' | 'advice';

interface ContentItem {
  id: number;
  type: CardType;
  text: string;
}

// Mock Data
const INITIAL_DATA: ContentItem[] = [
  {
    id: 1,
    type: 'joke',
    text: 'UDP is better in the COVID era since it avoids unnecessary handshakes.',
  }
];

export const CardSwiper: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>(INITIAL_DATA);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const currentCard = items[0];

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (isAnimating || !currentCard) return;

    setSwipeDirection(direction);
    setIsAnimating(true);

    let freshText = '';

    // FIX 1: Base the API fetch entirely on the CURRENT card's type,
    // not the direction swiped. If a joke leaves, a joke replaces it!
    const currentType = currentCard.type;

    try {
      if (direction === 'right') {
        const response = await axios.get(
          'https://v2.jokeapi.dev/joke/Any?type=single&format=txt',
        );
        freshText = response.data;
        setTimeout(() => {
          setItems((prevItems) => {
            const [, ...rest] = prevItems; // Evict the card that just animated away

            const newItem: ContentItem = {
              id: `fetched-${Date.now()}`,
              type: currentType, // FIX 2: Explicitly preserve the card type down the chain
              text: freshText,
            };

            return [...rest, newItem];
          });

          setSwipeDirection(null);
          setIsAnimating(false);
        }, 400);
      } else {
        const response = await axios.get('https://api.adviceslip.com/advice');
        freshText = response.data.slip.advice;
        setTimeout(() => {
          setItems((prevItems) => {
            const [, ...rest] = prevItems; // Evict the card that just animated away

            const newItem: ContentItem = {
              id: response.data.slip.id,
              type: currentType, // FIX 2: Explicitly preserve the card type down the chain
              text: freshText,
            };

            return [...rest, newItem];
          });

          setSwipeDirection(null);
          setIsAnimating(false);
        }, 400);
      }
    } catch (error) {
      console.error(`Error processing swipe:`, error);
      setSwipeDirection(null);
      setIsAnimating(false);
    }
  };

  if (!currentCard) {
    return <div className="swiper-container empty">No thoughts left!</div>;
  }

  // Determine background styling based on active swipe interaction
  // Dynamic color spectrum mapping based on your theme rules
  let containerBg;
  if (swipeDirection === 'right')
    containerBg = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Active Joke (Emerald Green)
  if (swipeDirection === 'left')
    containerBg = 'linear-gradient(135deg, #f58787ff 0%, #da8383ff 100%)'; // Active Advice (Complementary Crimson Red)

  return (
    <div className="swiper-wrapper" style={{ background: containerBg }}>
      {/* Decorative Branding Header */}
      <header className="swiper-header">
        <h1>Tinder for Thoughts</h1>
        <p>Swipe Right for a laugh, Left for wisdom</p>
      </header>

      {/* Main Swiper Deck Area */}
      <div className="deck-container">
        <div
          className={`thought-card ${swipeDirection ? 'swipe-' + swipeDirection : ''} ${currentCard.type}`}
        >
          {/* Card Label Tag */}
          <span className="card-badge">
            {currentCard.type === 'joke' ? '🤖 Tech Humour' : '💡 Life Advice'}
          </span>

          {/* Quote Content */}
          <p className="card-text">"{currentCard.text}"</p>

          {/* Card Footer Indicator */}
          <div className="card-footer">
            <span>← Advice</span>
            <span>Joke →</span>
          </div>
        </div>
      </div>

      {/* Manual Controller Buttons */}
      <div className="action-controls">
        <button
          className="btn btn-advice"
          onClick={() => handleSwipe('left')}
          disabled={isAnimating}
          aria-label="Swipe Left for Advice"
        >
          🧠 Wisdom
        </button>
        <button
          className="btn btn-joke"
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          aria-label="Swipe Right for Joke"
        >
          ⚡ Giggles
        </button>
      </div>
    </div>
  );
};
