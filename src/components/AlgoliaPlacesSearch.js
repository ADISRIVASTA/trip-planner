import React, { useEffect, useRef } from 'react';
import places from 'places.js';

const AlgoliaPlacesSearch = () => {
  const inputRef = useRef();

  useEffect(() => {
    const placesAutocomplete = places({
      appId: '366X2175QE',
      apiKey: '500dbff6874d321ea8b3b2f53ea52e0b',
      container: inputRef.current
    }).configure({
      type: 'address'
    });

    placesAutocomplete.on('change', (e) => {
      console.log(e.suggestion);
    });

    placesAutocomplete.on('clear', () => {
      console.log('Input cleared');
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        placeholder="Search for a location"
        style={{ width: '300px', padding: '8px' }}
      />
    </div>
  );
};

export default AlgoliaPlacesSearch;
