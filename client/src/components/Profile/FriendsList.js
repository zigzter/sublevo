import React from 'react';
import { Link } from 'react-router-dom';

const FriendsList = (props) => (
    <div className='FriendsList'>
        <h2>Friends</h2>
        <div className='friendsList'>
            {
                props.friends.map((friend) => (
                    <Link className='friend' to={`/users/${ friend.username }`} key={Math.random()}>
                        <div>
                            {friend.username}
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
);

export default FriendsList;
