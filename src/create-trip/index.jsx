import React, { useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Box } from 'lucide-react';

const center = { lat: 48.8584, lng: 2.2945 }; // Corrected longitude value

function CreateTrip() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us about your travel preferences</h2>
      <p className='mt-3 text-purple-900 text-xl'>
        Your perfect trip is just a few clicks away. Give us the basics and we'll handle the rest!
      </p>
      <div className='mt-15'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              onChange: (place) => {
                setSelectedPlace(place);
                if (place && place.value && place.value.geometry) {
                  const location = place.value.geometry.location;
                  setMap((prevMap) => {
                    if (prevMap) {
                      prevMap.panTo({ lat: location.lat(), lng: location.lng() });
                    }
                    return prevMap;
                  });
                }
              },
            }}
          />
        </div>
        <div className='mt-5'>
          <GoogleMap
            center={selectedPlace ? { lat: selectedPlace.value.geometry.location.lat(), lng: selectedPlace.value.geometry.location.lng() } : center}
            zoom={10}
            mapContainerStyle={{ width: '100%', height: '400px' }}
            onLoad={(map) => setMap(map)}
          >
            {selectedPlace && (
              <Marker
                position={{
                  lat: selectedPlace.value.geometry.location.lat(),
                  lng: selectedPlace.value.geometry.location.lng(),
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
