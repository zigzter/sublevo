import React from 'react';
import { Link } from 'react-router-dom';

const Attendees = (props) => {
    return (
        <div className='Attendees'>
            <div className='userList shadow-sm'>
                <h3>Going</h3>
                {
                    props.attendees.filter(a => a.status === 'going').map(user => {
                        const avatarCheck = user.avatar.slice(0, 5);
                        let avatar = (avatarCheck === 'https') ? user.avatar : `/img/${ user.avatar }`;
                        return (
                            <Link to={`/users/${ user.username }`} key={user.username} >
                                <img width='50px' height='50px' src={avatar} />
                            </Link>
                        )
                    })
                }
            </div>
            <div className='userList shadow-sm'>
                <h3>Interested</h3>
                {
                    props.attendees.filter(a => a.status === 'interested').map(user => {
                        const avatarCheck = user.avatar.slice(0, 5);
                        let avatar = (avatarCheck === 'https') ? user.avatar : `/img/${ user.avatar }`;
                        return (
                            <Link to={`/users/${ user.username }`} key={user.username} >
                                <img width='50px' height='50px' src={avatar} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Attendees;
