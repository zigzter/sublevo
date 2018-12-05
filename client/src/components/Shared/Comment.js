import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Comment = (props) => {
    const date = new Date(props.createdAt);
    return (
        <div className='Comment'>
            <div className="avatar">
                <img className="shadow-sm" src={(props.avatar) ? `/img/${ props.avatar }` : '/img/default.jpg'} alt="avatar" width='80px' height='80px' />
            </div>
            <div className="content">
                <h6><Link to={`/users/${ props.username }`}>{props.username}</Link></h6>
                <p>{props.content}</p>
                <button className='btn btn-link' onClick={() => props.deleteComment(props.id)}>Delete</button>
            </div>
            <span className='commentTime text-muted'>{date.toLocaleString()}</span>
        </div>
    );
};

export default Comment;
