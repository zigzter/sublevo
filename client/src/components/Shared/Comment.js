import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
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
            <span className='commentTime text-muted'><Moment format='MMM Do, YYYY - h:mm A'>{date}</Moment></span>
        </div>
    );
};

export default Comment;

Comment.propTypes = {
    createdAt: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
    content: PropTypes.string,
    deleteComment: PropTypes.func,
    id: PropTypes.number,
};
