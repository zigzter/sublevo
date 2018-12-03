import React from 'react';

const Attendees = (props) => {
    return (
        <div>
            <h3>Going</h3>
            {
                props.attendees.filter(a => a.status === 'going').map(user => <p key={user.username}>{user.username}</p>)
            }
            <h3>Interested</h3>
            {
                props.attendees.filter(a => a.status === 'interested').map(user => <p key={user.username}>{user.username}</p>)
            }
        </div>
    )
};

export default Attendees;
