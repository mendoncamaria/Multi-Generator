import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdviceGenerator() {
  const [advice, setAdvice] = useState('');

  const fetchAdvice = async () => {
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      setAdvice(response.data.slip.advice);
    } catch (error) {
      setAdvice('No Advice for Today!');
      console.error('Error fetching advice:', error);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div>
      <button onClick={fetchAdvice}>Give me Advice</button>
      <p>{advice}</p>
    </div>
  );
}
