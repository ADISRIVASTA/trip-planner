import React from 'react';

function Hotels({ hotels }) {
    if (!hotels || hotels.length === 0) {
        return <p className="text-gray-600">No hotel information available.</p>;
    }

    return (
        <div className="mt-8">
            <h2 className="_font-bold _text-4xl _mb-6 _text-center _text-purple-800">Hotel Recommendations</h2>
            <div className="_grid _gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {hotels.map((hotel, index) => (
                    <div 
                        key={index} 
                        className="_bg-blue-200 _shadow-lg _rounded-lg _p-6  _transition- _transform _hover:scale-105 _hover:shadow-xl"
                    >
                        <img 
                            src={hotel.imageUrl} 
                            alt={hotel.name} 
                            className="_w-full _h-48 _object-cover _rounded-t-lg _mb-4" 
                        />
                        <h3 className="_text-xl _font-semibold _text-blue-800 _mb-2">{hotel.name}</h3>
                        <p className="_text-black-600 _mb-2"><span className="font-medium">Location:</span> {hotel.address}</p>
                        <p className="_text-black-600 _mb-2"><span className="font-medium">Description:</span> {hotel.description}</p>
                        <p className="_text-black-600 _mb-2"><span className="_font-medium">Price Range:</span> {hotel.priceRange}</p>
                        <p className="_text-blue-600"><span className="_font-medium">Rating:</span> {hotel.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
