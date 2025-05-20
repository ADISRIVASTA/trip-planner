import React from 'react';
import Hotels from './Hotels';
import Itinerary from './Itinerary';

const Trip = ({ data }) => {
    return (
        <div>
            {data.locations.map((location, index) => (
                <section key={index} style={{ marginBottom: '40px' }}>
                    <h1>Trip to {location.name}</h1>
                    
                    <h2>Hotels</h2>
                    <Hotels hotels={location.hotels} />

                    <h2>Itinerary</h2>
                    {location.itinerary.map((day, idx) => (
                        <div key={idx} style={{ marginBottom: '40px' }}>
                            <h3>Day {day.day}</h3>
                            <Itinerary itinerary={[day]} />
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default Trip;
