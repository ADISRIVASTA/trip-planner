import React from 'react';
 // Import the custom CSS
 import { Link } from 'react-router-dom';
import { Button } from '../button';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-20 hero-container'>
      <div className='w-full hero-content'>
        <span style={{ color: 'white' }}>
          <u><h2 className='_text-xl _text-center'>Welcome to Pack&Fly:</h2></u>
        </span>
      </div>
      <h5 className="fancy-header">
    Your travel buddy crafting personalized itineraries, seamless bookings, and epic adventures. Pack less, fly more!
  </h5>

      <Link to={'/create-trip'}>
<Button>Get Started - It's Free</Button>
</Link>

      
      <img 
        src="src/assets/0d8e0215230f829053d078247b5d5bec.jpg" 
        alt="Nature Scenery"
        className="circle-frame mt-10"
      />
    </div>
  );
}

export default Hero;
