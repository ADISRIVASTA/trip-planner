// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore'; // Make sure to import getDoc
// import { toast } from 'sonner'; // Assuming you are using sonner for notifications
// import { db } from '../../service/firebaseConfig.jsx';
// import InfoSection from './components/InfoSection.jsx';
// import Hotels from './components/Hotels.jsx';


// function Viewtrip() {

//     const {tripId}=useParams();
//     const[trip,setTrip]=useState([])
//     useEffect(()=>{
//         tripId&&GetTripData();
//     },[tripId])
//     const GetTripData=async()=>{
//         const docRef=doc(db,'AITrips',tripId);
//         const docSnap=await getDoc(docRef) ;
//         if(docSnap.exists())
//         {
//             console.log("Document:",docSnap.data());
//             setTrip(docSnap.data());
//         }
//         else{
//             console.log("No such document");
//             toast("No trip found!")
//         }
        
//         }
      
//   return (
//     <div className='_p-10 _md:px-20 _lg:px-44'>
//    {/* {info} */}

// <InfoSection trip={trip}/>
// <Hotels hotels={trip.userData?.locations?.hotels}/>


//    {/* {hotels} */}


//    {/* {daily plan} */}

//    {
    
//     // footer
//    }
         
//     </div>
//   )
// }

// export default Viewtrip





// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { toast } from 'sonner';
// import { db } from '../../service/firebaseConfig.jsx';
// import InfoSection from './components/InfoSection.jsx';
// import { Hotel } from 'lucide-react';
// import Hotels from './components/Hotels.jsx';
// function Viewtrip() {
//     const { tripId } = useParams();
//     const [trip, setTrip] = useState(null); // State for trip data
//     const [loading, setLoading] = useState(true); // State for loading status
//     const [error, setError] = useState(null); // State for error handling

//     useEffect(() => {
//         if (tripId) {
//             GetTripData();
//         }
//     }, [tripId]);

//     const GetTripData = async () => {
//         setLoading(true); // Start loading
//         setError(null); // Clear previous errors

//         try {
//             const docRef = doc(db, 'AITrips', tripId);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 console.log("Document:", docSnap.data());
//                 setTrip(docSnap.data());
//             } else {
//                 console.log("No such document");
//                 toast("No trip found!");
//                 setError("No trip found!");
//             }
//         } catch (err) {
//             console.error("Error fetching document:", err);
//             setError("Error fetching trip data.");
//             toast("Error fetching trip data.");
//         } finally {
//             setLoading(false); // End loading
//         }
//     };

//     return (
//         <div className='_p-10 _md:px-20 _lg:px-44'>
//             {loading && <p>Loading trip data...</p>}
//             {error && <p>{error}</p>}
//             {trip && !loading && !error && <InfoSection trip={trip} />}

//         {/* //    {loading && <p>Loading trip data...</p>}
//            // {error && <p>{error}</p>}
//            // {trip && !loading && !error && <Hotels trip={trip} />} */}
//         </div>
//     );
// }

// export default Viewtrip;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { toast } from 'sonner';
// import { db } from '../../service/firebaseConfig.jsx';
// import InfoSection from './components/InfoSection.jsx';
// import Hotels from './components/Hotels.jsx';
// import Itinerary from './components/Itinerary.jsx';

// function Viewtrip() {
//     const { tripId } = useParams();
//     const [trip, setTrip] = useState(null);
//     const [selectedLocation, setSelectedLocation] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (tripId) {
//             GetTripData();
//         }
//     }, [tripId]);

//     useEffect(() => {
//         if (trip) {
//             handleRandomLocation(trip.tripData?.location || []);
//         }
//     }, [trip]);

//     const GetTripData = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const docRef = doc(db, 'AITrips', tripId);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 const data = docSnap.data();
//                 console.log("Document:", data);
//                 setTrip(data);
//             } else {
//                 console.log("No such document");
//                 toast("No trip found!");
//                 setError("No trip found!");
//             }
//         } catch (err) {
//             console.error("Error fetching document:", err);
//             setError("Error fetching trip data.");
//             toast("Error fetching trip data.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRandomLocation = (location) => {
//         if (location.length > 0) {
//             const randomIndex = Math.floor(Math.random() * location.length);
//             setSelectedLocation(location[randomIndex]);
       
//         } 
//     };

//     return (
//         <div className='_p-10 _md:px-20 _lg:px-44'>
//             {loading && <p>Loading trip data...</p>}
//             {error && <p>{error}</p>}
//             {trip && !loading && !error && (
//                 <>
//                     <InfoSection trip={trip} />
//                     {selectedLocation && <Hotels hotels={selectedLocation.hotels} />}
//                     {/* {selectedLocation && <Itinerary itinerary={selectedLocation.itinerary } />} */}
                  
//                 </>
//             )}
//         </div>
//     );
// }

// export default Viewtrip;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { db } from '../../service/firebaseConfig.jsx';
import InfoSection from './components/InfoSection.jsx';
import Hotels from './components/Hotels.jsx';
import Itinerary from './components/Itinerary.jsx';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    const GetTripData = async () => {
        setLoading(true);
        setError(null);

        try {
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("Document:", data);
                setTrip(data);
            } else {
                console.log("No such document");
                toast("No trip found!");
                setError("No trip found!");
            }
        } catch (err) {
            console.error("Error fetching document:", err);
            setError("Error fetching trip data.");
            toast("Error fetching trip data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='_p-10 _md:px-20 _lg:px-44'>
            {loading && <p>Loading trip data...</p>}
            {error && <p>{error}</p>}
            {trip && !loading && !error && (
                <>
                    <InfoSection trip={trip} />
                    <Hotels hotels={trip.tripData.hotels} />  
                    <Itinerary itinerary={trip.tripData.itinerary} />  
                </>
            )}
        </div>
    );
}

export default Viewtrip;

// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { doc, getDoc } from 'firebase/firestore';
// // import { toast } from 'sonner';
// // import { db } from '../../service/firebaseConfig.jsx';
// // import InfoSection from './components/InfoSection.jsx';
// // import Hotels from './components/Hotels.jsx';
// // import Itinerary from './components/Itinerary.jsx';

// // function Viewtrip() {
// //     const { tripId } = useParams();
// //     const [trip, setTrip] = useState(null);
// //     const [selectedLocation, setSelectedLocation] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         if (tripId) {
// //             GetTripData();
// //         }
// //     }, [tripId]);

// //     useEffect(() => {
// //         if (trip) {
// //             handleLocation(trip.tripData?.location);
// //         }
// //     }, [trip]);

// //     const GetTripData = async () => {
// //         setLoading(true);
// //         setError(null);

// //         try {
// //             const docRef = doc(db, 'AITrips', tripId);
// //             const docSnap = await getDoc(docRef);

// //             if (docSnap.exists()) {
// //                 const data = docSnap.data();
// //                 console.log("Document:", data);
// //                 setTrip(data);
// //             } else {
// //                 console.log("No such document");
// //                 toast("No trip found!");
// //                 setError("No trip found!");
// //             }
// //         } catch (err) {
// //             console.error("Error fetching document:", err);
// //             setError("Error fetching trip data.");
// //             toast("Error fetching trip data.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //     const handleLocation = (tripData) => {
// //         if (tripData.locations && Array.isArray(tripData.locations) && tripData.locations.length > 0) {
// //             // Handle case where locations is an array
// //             const randomIndex = Math.floor(Math.random() * tripData.locations.length);
// //             setSelectedLocation(tripData.locations[randomIndex]);
// //         } else if (tripData.location && typeof tripData.location === 'string') {
// //             // Handle case where location is a single string
// //             setSelectedLocation({
// //                 name: tripData.location, // Optional: You can include the location name
// //                 hotels: tripData.hotels,
// //                 itinerary: tripData.itinerary
// //             });
// //         } else {
// //             console.log("Location data is not available or in an unexpected format.");
// //             setSelectedLocation(null);
// //         }
// //     };
    

// //     return (
// //         <div className='_p-10 _md:px-20 _lg:px-44'>
// //             {loading && <p>Loading trip data...</p>}
// //             {error && <p>{error}</p>}
// //             {trip && !loading && !error && (
// //                 <>
// //                     <InfoSection trip={trip} />
// //                     {selectedLocation && <Hotels hotels={selectedLocation.hotels} />}
// //                     {selectedLocation && <Itinerary itinerary={selectedLocation.itinerary} />}
// //                 </>
// //             )}
// //         </div>
// //     );
// // }

// // export default Viewtrip;


// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { doc, getDoc } from 'firebase/firestore';
// // import { toast } from 'sonner';
// // import { db } from '../../service/firebaseConfig.jsx';
// // import InfoSection from './components/InfoSection.jsx';
// // import Hotels from './components/Hotels.jsx';
// // import Itinerary from './components/Itinerary.jsx';

// // function Viewtrip() {
// //     const { tripId } = useParams();
// //     const [trip, setTrip] = useState(null);
// //     const [locations, setLocations] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         if (tripId) {
// //             GetTripData();
// //         }
// //     }, [tripId]);

// //     useEffect(() => {
// //         if (trip) {
// //             handleLocations(trip.tripData);
// //         }
// //     }, [trip]);

// //     const GetTripData = async () => {
// //         setLoading(true);
// //         setError(null);

// //         try {
// //             const docRef = doc(db, 'AITrips', tripId);
// //             const docSnap = await getDoc(docRef);

// //             if (docSnap.exists()) {
// //                 const data = docSnap.data();
// //                 console.log("Document:", data);
// //                 setTrip(data);
// //             } else {
// //                 console.log("No such document");
// //                 toast("No trip found!");
// //                 setError("No trip found!");
// //             }
// //         } catch (err) {
// //             console.error("Error fetching document:", err);
// //             setError("Error fetching trip data.");
// //             toast("Error fetching trip data.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleLocations = (tripData) => {
// //         if (tripData.locations && Array.isArray(tripData.locations) && tripData.locations.length > 0) {
// //             // If locations array exists, set it to the state
// //             setLocations(tripData.locations);
// //         } else if (tripData.location && typeof tripData.location === 'string') {
// //             // If a single location exists as a string, treat it as a single-element array
// //             setLocations([{
// //                 name: tripData.location,
// //                 hotels: tripData.hotels,
// //                 itinerary: tripData.itinerary
// //             }]);
// //         } else {
// //             console.log("Location data is not available or in an unexpected format.");
// //             setLocations([]);
// //         }
// //     };

// //     return (
// //         <div className='_p-10 _md:px-20 _lg:px-44'>
// //             {loading && <p>Loading trip data...</p>}
// //             {error && <p>{error}</p>}
// //             {trip && !loading && !error && (
// //                 <>
// //                     <InfoSection trip={trip} />
// //                     {locations.map((location, index) => (
// //                         <div key={index} className="mt-10">
// //                             <h3 className="font-bold text-2xl mb-5">{location.name}</h3>
// //                             <Hotels hotels={location.hotels} />
// //                             <Itinerary itinerary={location.itinerary} />
// //                         </div>
// //                     ))}
// //                 </>
// //             )}
// //         </div>
// //     );
// // }

// // export default Viewtrip;
