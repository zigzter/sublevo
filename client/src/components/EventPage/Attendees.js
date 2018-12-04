import React from 'react';
import { Link } from 'react-router-dom';

const Attendees = (props) => {
    return (
        <div className='Attendees'>
            <div className='userList'>
                <h3>Going</h3>
                {
                    props.attendees.filter(a => a.status === 'going').map(user => (
                        <Link to={`/users/${ user.username }`} key={user.username} >
                            <img width='50px' height='50px' src={(user.avatar) ? `/img/${ user.avatar }` : '/img/default.jpg'} />
                        </Link>
                    ))
                }
            </div>
            <div className='userList'>
                <h3>Interested</h3>
                {
                    props.attendees.filter(a => a.status === 'interested').map(user => (
                        <Link to={`/users/${ user.username }`} key={user.username} >
                            <img width='50px' height='50px' src={(user.avatar) ? `/img/${ user.avatar }` : '/img/default.jpg'} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
};

export default Attendees;
