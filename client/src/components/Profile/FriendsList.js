import React from 'react';
import { Link } from 'react-router-dom';

const FriendsList = (props) => (
    <div className='FriendsList'>
        <h2>Friends</h2>
        <div className='friendsList'>
            {
                props.friends.map((friend) => (
                    <Link className='friend shadow-sm' to={`/users/${ friend.username }`} key={Math.random()}>
                        <img src={(friend.avatar) ? `/img/${ friend.avatar }` : '/img/default.jpg'} alt="avatar" width='80px' height='80px' />
                        <div>
                            <h4>{friend.username}</h4>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
);

export default FriendsList;
