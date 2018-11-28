import React from 'react';

const EditSeenForm = (props) => (
    <div>
        <h2>Edit seen</h2>
        {
            props.seen.map((artist) => (
                <form onSubmit={props.updateSeen} key={artist.id} className="input-group mb-1 updateSeen">
                    <div className="input-group-prepend">
                        <input type="hidden" name="id" value={artist.id} />
                        <label className="input-group-text" htmlFor="inputGroupSelect01">{artist.name}</label>
                    </div>
                    <input type="text" className="form-control" name="seenCount" defaultValue={artist.seenCount} />
                    <div className="input-group-append">
                        <button style={{ width: '200px' }} className="btn btn-outline-primary" type="submit" id={artist.id}>Update</button>
                        <button className="btn btn-outline-danger" onClick={() => props.removeSeen(artist.id)}>Delete</button>
                    </div>
                </form>
            ))
        }
    </div>
);

export default EditSeenForm;
