import React, { useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Box } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { AI_PROMT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import chatSession from '@/service/AIModal';
const center = { lat: 48.8584, lng: 2.2945 }; // Corrected longitude value
console.log(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);

function CreateTrip() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    
  
      setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
const OnGenerateTrip=async()=>{
  if ((formData?.noOfDays > 10 && !formData?.budget) || !formData?.traveler) {
    toast("Please fill all the details!");
    return;
  }
  
  
  const FINAL_PROMT=AI_PROMT
  .replace('{totalDays}',formData?.noOfDays)
  .replace('{traveler}',formData?.traveler)
  .replace('{budget}',formData?.budget)
 console.log(FINAL_PROMT);
 const result=await chatSession.sendMessage(FINAL_PROMT);
console.log(result?.response?.text());

} 
  return (
    <div className='_sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='_font-bold _text-3xl'>Tell us about your travel preferences</h2>
      <p className='_mt-3 _text-purple-900 _text-xl'>
        Your perfect trip is just a few clicks away. Give us the basics and we'll handle the rest!
      </p>

      <div className='_mt-15 flex flex-col gap-9'>
        {/* <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
        apiKey='import.meta.env.VITE_GOOGLE_PLACE_API_KEY'/>
        </div> */}

        <div>
          <h2 className='_text-xl _my-3 _font-medium'>How many days are you planning for a trip?</h2>
          <Input 
            placeholder='Ex. 3'
            type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='_text-xl _my-3 _font-medium'>What is your budget?</h2>
          <div className='_grid _grid-cols-3 _gap-5 _mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`_p-4 _border _cursor-pointer _rounded-lg hover:_shadow-lg 
                  ${formData?.budget === item.title ? 'shadow-clicked border-blue' : ''}`}
              >
                <h2 className='_text-4xl'>{item.icon}</h2>
                <h2 className='_font-bold text-lg'>{item.title}</h2>
                <h2 className='_text-sm _text-blue-800'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='_text-xl _my-3 _font-medium'>Who do you plan on your next trip?</h2>
          <div className='_grid _grid-cols-3 _gap-5 _mt-5'>
            {SelectTravelsList.map((item, index) => (
              <div key={index} 
                onClick={() => handleInputChange('traveler', item.people)}
                className={`_p-4 _border _cursor-pointer _rounded-lg hover:_shadow-lg 
                  ${formData?.traveler === item.people ? 'shadow-clicked border-blue' : ''}`}
              >
                <h2 className='_text-4xl'>{item.icon}</h2>
                <h2 className='_font-bold text-lg'>{item.title}</h2>
                <h2 className='_text-sm _text-blue-800'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='_my-10 _justify-end _flex'>
          <Button onClick={OnGenerateTrip}>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
