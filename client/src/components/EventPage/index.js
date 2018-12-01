import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from '../Shared/Comments';

export default class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            comments: [],
        }
    }
    addComment = async (e) => {
        e.persist();
        e.preventDefault();
        const { event } = this.state;
        const content = e.target.elements.body.value.trim();
        const targetId = event.id;
        const { id, createdAt } = await fetch(`/events/${ event.id }/comments`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content,
                targetId,
                targetType: 'event',
            }),
        }).then(res => res.json());
        const comment = [{ content, username: this.props.currentUser.username, id, createdAt }];
        this.setState({
            comments: comment.concat(this.state.comments)
        });
        e.target.elements.body.value = '';
    }
    deleteComment = (id) => {
        fetch(`/comments/${ id }`, { method: 'delete' });
        this.setState({
            comments: this.state.comments.filter(comment => comment.id !== id)
        });
    }
    getComments = async () => {
        const comments = await fetch(`/comments/${ this.state.event.id }`).then(res => res.json());
        this.setState({ comments });
    }
    async componentDidMount() {
        await this.setState({ event: this.props.location.state.event });
        this.getComments();
    }
    render() {
        const { event } = this.state;
        const { currentUser } = this.props;
        if (event.start) {
            return (
                <div>
                    <h1>{event.displayName}</h1>
                    <h2>{event.start.time} - {event.start.date}</h2>
                    <h2>{event.venue.displayName}</h2>
                    <Comments addComment={this.addComment} deleteComment={this.deleteComment} comments={this.state.comments} currentUser={currentUser} />
                </div>
            )
        }
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
};

EventPage.propTypes = {
    location: PropTypes.object,
};
