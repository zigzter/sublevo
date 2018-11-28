import React from 'react';

const EditVenueForm = (props) => {
    return (
        <div className='EditVenueForm'>
            <h2>Subscribed venues</h2>
            {
                props.subscriptions && props.subscriptions.map((venue) => (
                    <div key={venue.targetId} className="input-group mb-1">
                        <div className="input-group-prepend col">
                            <label className="input-group-text col">{venue.name}</label>
                        </div>
                        <div className="input-group-append">
                            <button id={venue.targetId} className="btn btn-outline-danger" onClick={() => props.removeSub(venue.targetId)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default EditVenueForm;
