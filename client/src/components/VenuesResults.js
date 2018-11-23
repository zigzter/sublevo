import React from 'react';


const VenuesResults = (props) => (
    <div>
        <ul>
            {
                props.venues.map((venue) => (
                    <li>
                        <h4>{venue.displayName}</h4>
                        <p>{venue.street}</p>
                        <p>{venue.city.displayName}</p>
                        <button onClick={() => props.addVenue(venue.name, venue.id)}>Add Venue</button>
                    </li>
                ))
            }
        </ul>
    </div>
);

export default VenuesResults;

// capacity: 990
// city: { displayName: "Vancouver", uri: "http://www.songkick.com/metro_areas/27398-canada-vancouver?utm_source=52207&utm_medium=partner", country: { … }, id: 27398, state: { … } }
// description: "Commodore Ballroom is a music venue housed in a 1920s Art Deco building on Granville Street, Vancouver. The venue is famous for its springy floor, with a layer of horse hair lining the floor beneath the floorboards. There is a 990 guests capacity. The venue is operated by Live Nation.
// ↵
// ↵The venue started life as 'Commodore Cabaret' in 1929. It shut due to the Great Depression and reopened as a live music venue, hosting thousands of acts over the decades.The Commodore underwent a $3.5m refurbishment in 1996.  Artists ranging from James Brown to Metric have taken to the stage."
// displayName: "Commodore Ballroom"
// id: 30021
// lat: 49.2806545
// lng: -123.1208915
// metroArea: { displayName: "Vancouver", uri: "http://www.songkick.com/metro_areas/27398-canada-vancouver?utm_source=52207&utm_medium=partner", country: { … }, id: 27398, state: { … } }
// phone: "604-739-4550"
// street: "868 Granville Street"
// uri: "http://www.songkick.com/venues/30021-commodore-ballroom?utm_source=52207&utm_medium=partner"
// website: "http://www.commodoreballroom.ca/"
// zip: "V6Z 1K3"