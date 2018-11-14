import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);
    }
    addComment(e) {
        e.preventDefault();
        const { user } = this.props;
        const content = e.target.elements.body.value.trim();
        const profileId = user.id;
        fetch(`/users/${user.username}/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                profileId,
            }),
        }).then(console.log);
        e.target.elements.body.value = '';
    }
    deleteComment(e) {
        e.preventDefault();
        const { id } = e.currentTarget;
        fetch(`/users/shteaz/comments/${id}`, { method: 'delete' });
    }
    render() {
        return (
            <div className="Comments">
                <h3>Comments</h3>
                <form onSubmit={this.addComment}>
                    <div>
                        <label htmlFor="body">Add Comment:</label> <br />
                        <textarea name="body" id="body" cols="50" rows="5"></textarea>
                    </div>
                    <input type="submit" value="Add Comment" />
                </form>
                <ul>
                    {
                        this.props.comments.map((comment) => {
                            return <li key={comment.id}>
                                <Link to={`/users/${comment.username}`}>{comment.username}:</Link>
                                <br />
                                {comment.content}
                                <button id={comment.id} onClick={this.deleteComment}>Delete</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
};
