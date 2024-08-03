// src/GeminiSearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

const GeminiSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const apiKey = 'AIzaSyBnbiB_XmxB6LGVCB0HEbgXFuPhedgEn-c';  // Replace with your Gemini API key

  const handleSearch = async (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2) { // Perform search only if query length > 2
      try {
        const response = await axios.get('https://api.gemini.com/search', {
          params: {
            q: event.target.value,
            api_key: apiKey
          }
        });
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data from Gemini API', error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a place"
        style={{ width: '300px', padding: '8px' }}
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GeminiSearchBar;
