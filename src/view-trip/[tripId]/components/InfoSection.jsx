import { Button } from '@/components/ui/button';
import React from 'react';
import { IoMdShare } from "react-icons/io";

function InfoSection({ trip }) {
  return (
    <div className='_flex _flex-col _items-center _text-center'>
   
      <img src='/travel.jpg' className='_h-340px _w-full _max-w-md _rounded-xl' />
      <div className='_my-5 _flex _gap-5 _items-center'>
        <h2 className='_p-1 _px-3 _bg-gray-200 _rounded-full _text-blue-800 _text-xs md:_text-md'>📅 {trip.userSelection?.noOfDays} Day</h2>
        <h2 className='_p-1 _px-3 _bg-gray-200 _rounded-full _text-blue-800 _text-xs md:_text-md'>💸 Budget: {trip.userSelection?.budget}</h2>
        <h2 className='_p-1 _px-3 _bg-gray-200 _rounded-full _text-blue-800 _text-xs md:_text-md'>🧳 No. of Travelers: {trip.userSelection?.traveler}</h2>
        <Button className='_p-1 _px-3'><IoMdShare /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
