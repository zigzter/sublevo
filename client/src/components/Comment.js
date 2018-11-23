import React from 'react';
import { Link } from 'react-router-dom';

const Comment = (props) => {
    const date = new Date(props.createdAt);
    return (
        <div className='Comment'>
            <h6><Link to={`/users/${props.username}`}>{props.username}</Link></h6>
            <span className='commentTime'>{date.toLocaleString()}</span>
            <p>{props.content}</p>
            <button className='btn btn-link' onClick={() => props.deleteComment(props.id)}>Delete</button>
        </div>
    );
};

export default Comment;
