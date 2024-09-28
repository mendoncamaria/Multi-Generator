import { useState, useEffect } from 'react';
import axios from 'axios';
// import Button from '../components/Button';

export default function JokeComponent() {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    try {
      const response = await axios.get(
        'https://v2.jokeapi.dev/joke/Any?format=txt'
      );
      console.log('🚀 ~ fetchJoke ~ response:', response);
      setJoke(response.data);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      {/* <Button buttonLabel={joke ? 'Tell me Another One!' : 'Tell me a Joke'} /> */}
      <button onClick={fetchJoke}>
        {joke ? 'Tell me Another One!' : 'Tell me a Joke'}
      </button>
      <p>{joke}</p>
    </div>
  );
}
