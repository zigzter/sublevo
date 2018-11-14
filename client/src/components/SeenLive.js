import React from 'react';

const SeenLive = (props) => (
    <div className="SeenLive">
        <ul>
            {
                props.seen.map((artist, ind) => (
                    <li key={ind}>{artist.name}</li>
                ))
            }
        </ul>
    </div>
);

export default SeenLive;
