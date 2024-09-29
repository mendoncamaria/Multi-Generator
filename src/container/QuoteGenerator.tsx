import { useState, useEffect } from 'react';
import axios from 'axios';
// import Button from '../components/Button';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        'https://api.adviceslip.com/advice'
      );
      setQuote(response.data.slip.advice);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      {/* <Button buttonLabel={joke ? 'Tell me Another One!' : 'Tell me a Joke'} /> */}
      <button onClick={fetchQuote}>
        {quote ? 'Tell me Another One!' : 'Tell me a Joke'}
      </button>
      <p>{quote}</p>
    </div>
  );
}
