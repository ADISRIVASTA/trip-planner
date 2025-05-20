import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>  },
    {
      path:'/create-trip',
      element:<CreateTrip/>
    },
 {
      path:'/view-trip/:tripId',
      element:<Viewtrip/>
    }
]); 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1019382426681-rpcrmcf1rfjtpcgipu6us862gm3p5krr.apps.googleusercontent.com"> 
  <Header/>
  <Toaster/>
   <RouterProvider router={router}/>
   </GoogleOAuthProvider>
  </React.StrictMode>,
)
