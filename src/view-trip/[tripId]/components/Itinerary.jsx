import React from 'react';

const Itinerary = ({ itinerary }) => {
    if (!itinerary || itinerary.length === 0) {
        return <p className="_text-gray-600">No itinerary available.</p>;
    }

    return (
        <section className="_mt-8">
            <h2 className="_text-2xl _font-bold _text-gray-800 _mb-6 _text-center">Itinerary</h2>
            <div className="_max-h-[600px] _overflow-y-auto _p-6 border 
            _border-gray-300 _rounded-lg _bg-white shadow-md">
                {itinerary.map((day, index) => (
                    <div key={index} className="_mb-8">
                        <h3 className="_text-xl _font-semibold text-gray-700 _mb-4">Day {day.day}</h3>
                        <ul className="list-none p-0">
                            {day.schedule.map((event, idx) => (
                                <li key={idx} className="mb-6">
                                    <p className="_text-lg _font-medium _text-gray-800"><strong>{event.time}:</strong> {event.place}</p>
                                    {event.imageUrl && (
                                        <img 
                                            src={event.imageUrl} 
                                            alt={event.place} 
                                            className="_w-full _max-h-[200px] _object-cover _rounded-lg _mt-2 _mb-4"
                                        />
                                    )}
                                    <p className="_text-gray-600">{event.details}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Itinerary;
