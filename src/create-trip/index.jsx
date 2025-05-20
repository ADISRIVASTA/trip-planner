import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore"; 
import axios from 'axios';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '../service/firebaseConfig.jsx';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import chatSession from '@/service/AIModal';
import { AI_PROMT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';

console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if ((formData?.noOfDays > 7 && !formData?.budget) || !formData?.traveler) {
      toast("Please fill all the details!");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMT
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const rawText = await result?.response?.text();
      console.log("-- Raw Result --", rawText);

      // Check if the rawText is valid JSON
      let parsedTripData;
      try {
        parsedTripData = JSON.parse(rawText);
      } catch (jsonError) {
        console.error("Invalid JSON:", jsonError);
        console.error("Raw JSON received:", rawText);
        toast("Received invalid trip data. Check console for details.");
        setLoading(false);
        return;
      }

      await SaveAiTrip(parsedTripData);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Error generating trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (parsedTripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    const tripData = {
      userSelection: formData,
      tripData: parsedTripData,
      userEmail: user?.email,
      id: docId,
    };

    try {
      await setDoc(doc(db, "AITrips", docId), tripData);
      console.log('Trip saved successfully. Redirecting to view trip page...');
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Error saving trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = async (accessToken) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });
      console.log('User Info:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user info:', error.response ? error.response.data : error.message);
    } finally {
      setOpenDialog(false);
      OnGenerateTrip();
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Google Login Response:', response);
      if (response?.access_token) {
        GetUserProfile(response.access_token);
      } else {
        console.error('No access token received');
      }
    },
    onError: (error) => console.error('Login Error:', error),
  });

  return (
    <div style={{ marginLeft: '30px' }} className='_sm:px-10 md:px-32 lg:px-56 xl:_px-10 _px-5 _mt-10'>
      <h2 className='_font-bold _text-3xl'>Tell us about your travel preferences</h2>
      <p className='_mt-3 _text-purple-900 _text-xl'>
        Your perfect trip is just a few clicks away. Give us the basics and we'll handle the rest!
      </p>

      <div className='_mt-15 flex flex-col gap-9'>
        <div>
          <h2 className='_text-xl _my-3 _font-bold'>How many days are you planning for a trip?</h2>
          <Input
            placeholder='Ex. 3'
            type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='_text-xl _my-3 _font-bold'>What is your budget?</h2>
          <div className='_grid _grid-cols-3 _gap-8 _mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`_p-4 _border _cursor-pointer _rounded-lg hover:_shadow-lg 
                  ${formData?.budget === item.title ? 'shadow-clicked border-blue' : ''}`}
              >
                <h2 className='_text-4xl'>{item.icon}</h2>
                <h2 className='_font-bold _text-lg'>{item.title}</h2>
                <h2 className='_text-sm _text-blue-800'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='_text-xl _my-3 _font-bold'>Who do you plan on your next trip?</h2>
          <div className='_grid _grid-cols-3 _gap-8 _mt-5'>
            {SelectTravelsList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`_p-8 _border _cursor-pointer _rounded-lg hover:_shadow-lg 
                  ${formData?.traveler === item.people ? 'shadow-clicked border-blue' : ''}`}
              >
                <h2 className='_text-4xl'>{item.icon}</h2>
                <h2 className='_font-bold _text-lg'>{item.title}</h2>
                <h2 className='_text-sm _text-blue-800'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='_my-10 _justify-end _flex'>
          <Button
            disabled={loading}
            onClick={OnGenerateTrip}
          >
            {loading ? <AiOutlineLoading3Quarters className='_h-7 _w-7 _animate-spin' /> : 'Generate Trip'}
          </Button>
        </div>
        
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription style={{ _fontSize: openDialog ? '1.5rem' : '1rem', fontWeight: openDialog ? 'bold' : 'normal' }}>
                <img src="/logo.svg" alt="v" />
                <h2 className='_font-bold _text-lg _mt-7'></h2>
                <p style={{ color: 'bisque' }}>Sign in with Google authentication securely</p>
                <Button onClick={login} className='_w-full _mt-5 flex _gap-4 _items-center'>
                  <FcGoogle className='_h-7 _w-7' />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
