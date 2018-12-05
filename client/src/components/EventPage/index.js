import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import Comments from '../Shared/Comments';
import GOOGLE_MAPS_KEY from '../../keys';
import Attendees from './Attendees';
import './index.scss';

export default class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            comments: [],
            attendees: [],
            currentUserStatus: undefined,
        }
    }
    addComment = async (e) => {
        e.persist();
        e.preventDefault();
        const { event } = this.state;
        const { currentUser } = this.props;
        const content = e.target.elements.body.value.trim();
        const targetId = event.id;
        const { id, createdAt } = await fetch('/comments', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content,
                targetId,
                targetType: 'event',
            }),
        }).then(res => res.json());
        const comment = [{ content, username: this.props.currentUser.username, avatar: currentUser.avatar, id, createdAt }];
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
    getAttendees = async () => {
        const attendees = await fetch(`/events/${ this.state.event.id }`).then(res => res.json());
        const [{ status: currentUserStatus }] = attendees.filter(attendee => attendee.id === this.props.currentUser.id);
        this.setState({ attendees, currentUserStatus });
    }
    attend = (status) => {
        fetch(`/events/${ this.state.event.id }`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        this.setState({ currentUserStatus: status })
    }
    async componentDidMount() {
        await this.setState({ event: this.props.location.state.event });
        this.getComments();
        this.getAttendees();
    }
    render() {
        const { event, attendees, currentUserStatus } = this.state;
        const { currentUser } = this.props;
        if (event.start) {
            return (
                <div className='EventPage'>
                    <h1>{event.performance.filter(a => a.billing === 'headline').map((artist) => artist.displayName).join(', ') || event.displayName}</h1>
                    <h2>{event.performance.filter(a => a.billing === 'support').map((artist) => artist.displayName).join(', ') || ''}</h2>
                    <h2>{event.start.time} - {event.start.date}</h2>
                    <div className='location'>
                        <p>{event.venue.displayName}</p>
                        <p>{event.venue.street}</p>
                        <p>{(event.venue.city) ? event.venue.city.displayName : event.venue.metroArea.displayName}</p>
                        <iframe
                            title="googleMap"
                            width="450"
                            height="250"
                            frameBorder="0" style={{ border: 0 }}
                            src={`https://www.google.com/maps/embed/v1/search?key=${ GOOGLE_MAPS_KEY }&q=${ event.venue.displayName }`} allowFullScreen>
                        </iframe>
                    </div>
                    <ButtonGroup>
                        <Button
                            onClick={() => this.attend('going')}
                            color={(currentUserStatus === 'going') ? 'info' : 'success'}
                        >
                            Going {(currentUserStatus === 'going') ? '✓' : ''}
                        </Button>
                        <Button
                            onClick={() => this.attend('interested')}
                            color={(currentUserStatus === 'interested') ? 'info' : 'primary'}
                            outline
                        >
                            Interested {(currentUserStatus === 'interested') ? '✓' : ''}
                        </Button>
                    </ButtonGroup>
                    <Attendees attendees={attendees} />
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
}

EventPage.propTypes = {
    location: PropTypes.object,
    currentUser: PropTypes.object,
};
